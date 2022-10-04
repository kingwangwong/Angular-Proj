import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='navbar-nav'>
      <li class='nav-item'><a class='nav-link' routerLinkActive='active' 
      [routerLink]="['/welcome']">Home</a></li>
      <li class='nav-item'><a class='nav-link' routerLinkActive='active' 
      [routerLink]="['/managers']">Managers List</a></li>
      <li class='nav-item'><a class='nav-link' routerLinkActive='active' 
      [routerLink]="['/managers/0/edit']">Add a Manager Review</a></li>
    </ul>
</nav>
<div class='container'>
<router-outlet></router-outlet>
</div>
  `
  ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'RateMyManager';
}
