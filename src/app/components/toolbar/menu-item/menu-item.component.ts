import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionItem } from '../models/action-item.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: ActionItem[];
  @ViewChild('childMenu', { static: true }) public childMenu;
  constructor() { }

  ngOnInit() {
  }

}
