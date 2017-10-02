import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: 'albums',
    component: AlbumsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {}
