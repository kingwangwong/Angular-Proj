import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Manager } from './manager';
import { ManagerService } from './manager.service';

@Component({
  templateUrl: './manager-detail.component.html',
  styleUrls: ['./manager-detail.component.css']
})
export class ManagerDetailComponent implements OnInit {
  pageTitle = 'Manager Detail';
  errorMessage = '';
  manager: Manager | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ManagerService: ManagerService) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getmanager(id);
    }
  }

  getmanager(id: number): void {
    this.ManagerService.getManager(id).subscribe({
      next: manager => this.manager = manager,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/managers']);
  }

}
