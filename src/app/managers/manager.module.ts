import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ManagerData } from './manager-data';

import { ManagerListComponent } from './manager-list.component';
import { ManagerDetailComponent } from './manager-detail.component';
import { ManagerEditComponent } from './manager-edit.component';
import { ManagerEditGuard } from './manager-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ManagerData),
    RouterModule.forChild([
      { path: 'managers', component: ManagerListComponent },
      { path: 'managers/:id', component: ManagerDetailComponent },
      {
        path: 'managers/:id/edit',
        canDeactivate: [ManagerEditGuard],
        component: ManagerEditComponent
      }
    ])
  ],
  declarations: [
    ManagerListComponent,
    ManagerDetailComponent,
    ManagerEditComponent
  ]
})
export class ManagerModule { }
