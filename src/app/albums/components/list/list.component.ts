import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { SpotifyAlbumsService } from '../../../spotify/services/albums/albums.service';
import { Album } from '../../models/albums.model';

@Component({
  selector: 'app-albums-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  public isLoading = true;
  public hasLoadingFailure = false;
  public albums: Album[];

  private albumsStore: Store<any>;

  constructor(
    private store: Store<any>,
    private spotifyAlbumsService: SpotifyAlbumsService
  ) {
    this.albumsStore = this.store.select(state => state.albums);
  }

  ngOnInit() {
    // Load store with albums
    this.spotifyAlbumsService.load()
      .subscribe({
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });

    // Subscribe to Albums
    this.albumsStore.subscribe((albums: Album[]) => {
      this.albums = albums;
    });
  }
}
