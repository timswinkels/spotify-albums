import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';

import { StoreModule, Store } from '@ngrx/store';
import { albumsReducer } from './reducers/albums.reducer';
import { AlbumsListComponent } from './components/list/list.component';

import { SpotifyAlbumsService } from '../spotify/services/albums/albums.service';

import { SaModule } from '../sa/sa.module';
import { AlbumsItemComponent } from '../albums/components/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    SaModule,
    StoreModule.forRoot({ albums: albumsReducer })
  ],
  providers: [SpotifyAlbumsService],
  declarations: [AlbumsListComponent, AlbumsItemComponent],
  exports: [AlbumsListComponent]
})
export class AlbumsModule {}
