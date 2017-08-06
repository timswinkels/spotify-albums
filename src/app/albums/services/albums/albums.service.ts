import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ISpotifySavedAlbum } from '../../reducers/albums.reducer';

import { Observable, Observer } from 'rxjs/Rx';

interface SpotifyApiItemsResponse {
  href: string;
  items: ISpotifySavedAlbum[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

@Injectable()
export class AlbumsService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<ISpotifySavedAlbum[]> {
    return new Observable((observer: Observer<ISpotifySavedAlbum[]>) => {
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

            // Send new items
            observer.next(response.items);

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
}
