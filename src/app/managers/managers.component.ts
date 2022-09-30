import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IManager } from "./manager";
import { ManagerService } from "./manager.service";

@Component({
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit, OnDestroy {
  pageTitle = 'Manager List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredManagers = this.performFilter(value);
  }

  filteredManagers: IManager[] = [];
  managers: IManager[] = [];

  constructor(private managerService: ManagerService) {}

  performFilter(filterBy: string): IManager[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.managers.filter((manager: IManager) =>
      manager.managerName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.managerService.getManagers().subscribe({
      next: managers => {
        this.managers = managers;
        this.filteredManagers = this.managers;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Manager List: ' + message;
  }
}
