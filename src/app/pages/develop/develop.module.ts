import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { DevelopRoutingModule } from './develop-routing.module';
import { DevelopComponent } from './develop.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [DevelopComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
    DevelopRoutingModule,
    ToolbarModule
  ]
})
export class DevelopModule { }
