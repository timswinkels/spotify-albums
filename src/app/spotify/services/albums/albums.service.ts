import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

import { Store } from '@ngrx/store';
import { Album } from '../../../albums/models/albums.model';
import * as album from '../../../albums/actions/albums.action';

interface SpotifySavedAlbum {
  added_at: string;
  album: SpotifyAlbum;
}

interface SpotifyAlbum {
  id: 'string';
  name: 'string';
  artists: { name: string; }[];
  album_type: 'album' | 'compilation' | 'single';
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  images: { url: string; height: number; width: number }[];
}

interface SpotifyApiItemsResponse {
  href: string;
  items: SpotifySavedAlbum[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

@Injectable()
export class SpotifyAlbumsService {

  private albumsStore: Store<Album[]>;
  private albumsCount = 0;

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) {
    this.albumsStore = store.select(state => state.albums);
  }

  public load(foreceReload?): Observable<Album> {
    return new Observable((observer) => {
      let itemCount = 0;

      let httpParams = new HttpParams();
      httpParams = httpParams.set('offset', '0');
      httpParams = httpParams.set('limit', '50');

      const fetchItems = () => {
        // Spotify I/O request
        this.http.get('https://api.spotify.com/v1/me/albums', { params: httpParams }).subscribe({
          next: (response: SpotifyApiItemsResponse) => {
            // Add items to local list of items
            itemCount += response.items.length;

            // Store and next
            response.items.forEach((spotifySavedAlbum: SpotifySavedAlbum) => {
              observer.next(spotifySavedAlbum);

              if (spotifySavedAlbum.album.album_type !== 'single') {
                const item = this.SpotifyAlbum2Album(spotifySavedAlbum.album);

                this.albumsStore.dispatch({
                  type: album.ADD,
                  data: item
                });
              }
            });

            // Get more items if pressent
            if (response.next) {
              // Set new offset
              httpParams = httpParams.set('offset', '' + itemCount);

              // Fetch more
              fetchItems();
            }
            // No more items
            else {
              observer.complete();
            }
          },
          error: (error) => {
            observer.error(new Error('Could not fetch saved albums from Spotify'));
          }
        });
      };

      // Start fetching
      fetchItems();
    });
  }

  private SpotifyAlbum2Album = (data: SpotifyAlbum): Album => {
    return {
      id: data.id,
      title: data.name,
      artist: '' + data.artists.map(artist => artist.name).join(', '), // Put all artists into one string
      type: data.album_type,
      year: new Date(data.release_date).getFullYear(),
      imageUrl: data.images.sort((a, b) => b.width - a.width)[0].url // Get bigest image available
    };
  }
}
