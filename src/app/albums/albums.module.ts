import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';

import { StoreModule, Store } from '@ngrx/store';
import { albumsReducer, ADD_BULK } from './reducers/albums.reducer';
import { AlbumsListComponent } from './components/list/list.component';

import { AlbumsService } from './services/albums/albums.service';

@NgModule({
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    StoreModule.forRoot({ albums: albumsReducer })
  ],
  providers: [AlbumsService],
  declarations: [AlbumsListComponent],
  exports: [AlbumsListComponent]
})
export class AlbumsModule {}
