import { Component, OnInit } from '@angular/core';

import { Manager } from './manager';
import { ManagerService } from './manager.service';

@Component({
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {
  pageTitle = 'Manager List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredManagers = this.listFilter ? this.performFilter(this.listFilter) : this.managers;
  }

  filteredManagers: Manager[] = [];
  managers: Manager[] = [];

  constructor(private ManagerService: ManagerService) { }

  performFilter(filterBy: string): Manager[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.managers.filter((manager: Manager) =>
      manager.managerName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the manager name and tags
  performFilter2(filterBy: string): Manager[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.managers.filter((manager: Manager) =>
      manager.managerName.toLocaleLowerCase().indexOf(filterBy) !== -1 )//||
        //(manager.tags && manager.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.ManagerService.getManagers().subscribe({
      next: managers => {
        this.managers = managers;
        this.filteredManagers = this.managers;
      },
      error: err => this.errorMessage = err
    });
  }
}
