import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { SpotifyAlbumsService } from '../../../spotify/services/albums/albums.service';
import { Album } from '../../models/albums.model';

import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-albums-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public isLoadFailed = false;
  public albums: Album[];

  private albumsStore: Store<Album[]>;
  private unsubscribe = new Subject<void>();

  constructor(
    private store: Store<any>,
    private spotifyAlbumsService: SpotifyAlbumsService
  ) {
    this.albumsStore = this.store.select(state => state.albums);
  }

  public ngOnInit() {
    // Subscribe to Albums
    this.albumsStore
      .takeUntil(this.unsubscribe)
      .subscribe(
        (albums) => {
          // Initial load of store, when scope is unset and store returns 0 items
          if (!this.albums && !albums.length) {
            this.loadAlbums();
          }
          else {
            this.isLoading = false;
          }

          this.albums = albums;
        }
      );
  }

  // Load store with albums
  public loadAlbums (): void {
    this.isLoading = true;
    this.isLoadFailed = false;

    const loadStore = this.spotifyAlbumsService.load()
      .subscribe(
        () => {
          this.isLoading = false;
          loadStore.unsubscribe();
        },
        (error) => {
          this.isLoadFailed = true;
          this.isLoading = false;
        }
      );
   }

  public ngOnDestroy () {
    this.unsubscribe.next();
  }
}
