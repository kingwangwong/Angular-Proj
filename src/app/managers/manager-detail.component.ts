import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IManager } from './manager';
import { ManagerService } from './manager.service';

@Component({
  templateUrl: './manager-detail.component.html',
})
export class ManagerDetailComponent implements OnInit {
  pageTitle = 'Manager Detail';
  errorMessage = '';
  manager: IManager | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private managerService: ManagerService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getManager(id);
    }
  }

  getManager(id: number): void {
    this.managerService.getManager(id).subscribe({
      next: manager => this.manager = manager,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/managers']);
  }
}
