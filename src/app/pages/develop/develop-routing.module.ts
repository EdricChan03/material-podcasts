import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopComponent } from './develop.component';

const routes: Routes = [
  {
    path: '',
    component: DevelopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopRoutingModule { }
