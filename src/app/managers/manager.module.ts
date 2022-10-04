import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ManagerDetailComponent } from './manager-detail.component';
import { ManagerDetailGuard } from './manager-detail.guard';
import { ManagerEditComponent } from './manager-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ManagersComponent } from './managers.component';

@NgModule({
    declarations: [
        ManagersComponent,
        ManagerDetailComponent,
        ManagerEditComponent
    ],
    imports: [
        InMemoryWebApiModule.forRoot(ManagerData),
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'managers', component: ManagersComponent },
            { 
              path: 'managers/:id', 
              canActivate: [ManagerDetailGuard],
              component: ManagerDetailComponent 
            },
            {
                path: 'managers/:id/edit',
                component: ManagerEditComponent
            }
          ]),
        SharedModule
    ]
})

export class ManagerModule { }
