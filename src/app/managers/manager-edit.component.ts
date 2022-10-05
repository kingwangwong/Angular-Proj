import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Manager } from './manager';
import { ManagerService } from './manager.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './manager-edit.component.html'
})
export class ManagerEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  pageTitle = 'Manager Edit';
  errorMessage = '';
  managerForm!: FormGroup;

  manager!: Manager;
  private sub!: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private managerService: ManagerService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      managerName: {
        required: 'Manager name is required.',
        minlength: 'Manager name must be at least two characters.',
        maxlength: 'Manager name cannot exceed 50 characters.'
      },
      company: {
        required: 'Manager code is required.'
      },
      rating: {
        range: 'Rate the manager between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.managerForm = this.fb.group({
      managerName: ['', [Validators.required,
                         Validators.minLength(2),
                         Validators.maxLength(50)]],
      company: ['', Validators.required],
      rating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Read the manager Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getManager(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.managerForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.managerForm);
    });
  }


  getManager(id: number): void {
    this.managerService.getManager(id)
      .subscribe({
        next: (manager: Manager) => this.displayManager(manager),
        error: err => this.errorMessage = err
      });
  }

  displayManager(manager: Manager): void {
    if (this.managerForm) {
      this.managerForm.reset();
    }
    this.manager = manager;

    if (this.manager.id === 0) {
      this.pageTitle = 'Add Manager';
    } else {
      this.pageTitle = `Edit Manager: ${this.manager.managerName}`;
    }

    // Update the data on the form
    this.managerForm.patchValue({
      managerName: this.manager.managerName,
      rating: this.manager.rating,
      description: this.manager.description
    });
    //this.managerForm.setControl('tags', this.fb.array(this.manager.tags || []));
  }

  deleteManager(): void {
    if (this.manager.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else if (this.manager.id) {
      if (confirm(`Really delete the manager: ${this.manager.managerName}?`)) {
        this.managerService.deleteManager(this.manager.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveManager(): void {
    if (this.managerForm.valid) {
      if (this.managerForm.dirty) {
        const p = { ...this.manager, ...this.managerForm.value };

        if (p.id === 0) {
          this.managerService.createManager(p)
            .subscribe({
              next: x => {
                console.log(x);
                return this.onSaveComplete();
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.managerService.updateManager(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.managerForm.reset();
    this.router.navigate(['/managers']);
  }
}
