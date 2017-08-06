import { ActionReducer, Action } from '@ngrx/store';

export interface IAlbum {
  title: string;
  artist: string;
  type: 'album' | 'compilation' | 'single';
  year: number;
  imageUrl: string;
}

export interface ISpotifySavedAlbum {
  added_at: string;
  album: ISpotifyAlbum;
}

interface ISpotifyAlbum {
  name: 'string';
  artists: { name: string; }[];
  album_type: 'album' | 'compilation' | 'single';
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  images: { url: string; height: number; width: number }[];
}

export const ADD_BULK = 'ADD_BULK';
export const CLEAR = 'CLEAR';

export function albumsReducer(state: IAlbum[] = [], action) {
  switch (action.type) {
    case CLEAR: {
      return state = [];
    }
    case ADD_BULK: {
      // Transform Spotify data to album and filter by non singles
      const newAlbums = action.values
        .map((entry: ISpotifySavedAlbum): IAlbum => {
          return transformSpotifyDataToAlbum(entry.album);
        })
        .filter((album: IAlbum) => {
          return album.type !== 'single';
        });

      // Merge albums to state
      return state = state.concat(newAlbums);
    }
    default: {
      return state;
    }
  }
}

const transformSpotifyDataToAlbum = (data: ISpotifyAlbum): IAlbum => {
  const album: IAlbum = {
    title: '' + data.name,
    artist: '' + data.artists.map(artist => artist.name).join(', '), // Put all artists into one string
    type: data.album_type,
    year: new Date(data.release_date).getFullYear(),
    imageUrl: data.images.sort((a, b) => b.width - a.width)[0].url // Get bigest image available
  };

  return album;
};
