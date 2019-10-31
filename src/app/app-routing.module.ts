import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'develop',
    loadChildren: () => import('./pages/develop/develop.module').then(m => m.DevelopModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExploreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
