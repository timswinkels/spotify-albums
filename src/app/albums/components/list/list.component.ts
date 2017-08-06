import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../../services/albums/albums.service';

import { Store } from '@ngrx/store';
import { IAlbum, ADD_BULK, CLEAR } from '../../reducers/albums.reducer';

@Component({
  selector: 'app-albums-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  public isLoading = true;
  public hasLoadingFailure = false;
  public albums: IAlbum[];
  public album: IAlbum;

  private albumsStore: Store<any>;

  constructor(
    private store: Store<any>,
    private albumsService: AlbumsService
  ) {
    this.albumsStore = this.store.select(state => state.albums);
  }

  ngOnInit() {
    // (Re)load store with albums
    this.albumsStore.dispatch({ type: CLEAR });

    const albumsServiceObservable = this.albumsService.getAll();

    albumsServiceObservable.subscribe({
      next: (albumsChunk) => {
        this.albumsStore.dispatch({ type: ADD_BULK, values: albumsChunk });
      },
      error: () => {
        this.hasLoadingFailure = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });

    // Subscribe to Albums
    this.albumsStore.subscribe((albums: IAlbum[]) => {
      this.albums = albums;
    });
  }
}
