import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ManagerEditComponent } from './manager-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ManagerEditGuard implements CanDeactivate<ManagerEditComponent> {
  canDeactivate(component: ManagerEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.managerForm.dirty) {
      const managerName = component.managerForm.get('managerName')?.value || 'New Manager';
      return confirm(`Navigate away and lose all changes to ${managerName}?`);
    }
    return true;
  }
}
