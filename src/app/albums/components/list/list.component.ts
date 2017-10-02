import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { SpotifyAlbumsService } from '../../../spotify/services/albums/albums.service';
import { Album } from '../../models/albums.model';

import { Subscription, Subject } from 'rxjs/Rx';

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
    // Load store with albums
    this.spotifyAlbumsService.load()
      .takeUntil(this.unsubscribe)
      .subscribe(
        () => {},
        (error) => {
          this.isLoadFailed = true;
          this.isLoading = false;
        },
        () => this.isLoading = false
      );

    // Subscribe to Albums
    this.albumsStore
      .takeUntil(this.unsubscribe)
      .subscribe(
        (albums) => this.albums = albums
      );
  }

  public ngOnDestroy () {
    this.unsubscribe.next();
  }
}
