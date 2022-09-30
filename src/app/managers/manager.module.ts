import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ManagerDetailComponent } from './manager-detail.component';
import { ManagerDetailGuard } from './manager-detail.guard';
import { ManagersComponent } from './managers.component';

@NgModule({
    declarations: [
        ManagersComponent,
        ManagerDetailComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'managers', component: ManagersComponent },
            { 
              path: 'managers/:id', 
              canActivate: [ManagerDetailGuard],
              component: ManagerDetailComponent 
            }
          ]),
        SharedModule
    ]
})

export class ManagerModule { }
