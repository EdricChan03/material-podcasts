import { Component, ViewChild } from '@angular/core';
import { ToolbarService } from './components/toolbar/toolbar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  constructor(public toolbar: ToolbarService<any>) {
    toolbar.setMenuClickListener(ev => { this.sidenav.toggle(); });
  }
  links = [
    {
      title: 'Home',
      link: '/',
      icon: 'home'
    }
  ];
}
