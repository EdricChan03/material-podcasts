import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from './toolbar.component';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [ToolbarComponent, MenuItemComponent],
  exports: [ToolbarComponent],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    FlexLayoutModule,
    RouterModule
  ]
})
export class ToolbarModule { }
