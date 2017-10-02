import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Album } from '../../models/albums.model';

import { Subscription, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-albums-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class AlbumsItemComponent implements OnInit, OnDestroy {

  public album: Album;

  private albumsStore: Store<Album[]>;
  private isLoadFailed = false;
  private isLoading = true;
  //
  private unsubscribe = new Subject<void>();
  private unsubscribeStore = new Subject<void>();

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute
  ) {
    this.albumsStore = this.store.select(state => state.albums);
  }

  public ngOnInit() {
    // Get ID
    this.activatedRoute.params
      .takeUntil(this.unsubscribe)
      .subscribe(
        // Next
        ({ albumId }) => {
          this.isLoading = true;
          this.isLoadFailed = false;
          this.getAlbum(albumId);
        },
        // Error
        () => {
          this.isLoadFailed = true;
          this.isLoading = false;
        }
      );
  }

  public getAlbum (id) {
    this.unsubscribeStore.next();

    this.albumsStore
      .takeUntil(this.unsubscribe)
      .takeUntil(this.unsubscribeStore)
      .map((albums) => albums.find((album) => album.id === id))
      .subscribe(
        // Next
        (album) => {
          this.album = album;
          this.isLoading = false;
        },
        // Error
        () => {
          this.isLoadFailed = true;
          this.isLoading = false;
        }
      );
  }

  public ngOnDestroy () {
    this.unsubscribe.next();
  }
}
