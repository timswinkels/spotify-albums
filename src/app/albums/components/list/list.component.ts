import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { SpotifyAlbumsService } from '../../../spotify/services/albums/albums.service';
import { Album } from '../../models/albums.model';

import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-albums-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public hasLoadingFailure = false;
  public albums: Album[];

  private albumsStore: Store<Album[]>;
  private albumsSubscription: Subscription;

  constructor(
    private store: Store<any>,
    private spotifyAlbumsService: SpotifyAlbumsService
  ) {
    this.albumsStore = this.store.select(state => state.albums);
  }

  public ngOnInit() {
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
    this.albumsSubscription = this.albumsStore.subscribe((albums) => {
      this.albums = albums;
    });
  }

  public ngOnDestroy () {
    this.albumsSubscription.unsubscribe();
  }
}
