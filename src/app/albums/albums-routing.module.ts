import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsListComponent } from './components/list/list.component';
import { AlbumsItemComponent } from './components/item/item.component';

const routes: Routes = [
  {
    path: 'albums',
    component: AlbumsListComponent
  },
  {
    path: 'albums/:albumId',
    component: AlbumsItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {}
