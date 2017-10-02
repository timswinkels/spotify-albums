import { createSelector, ActionReducer, Action } from '@ngrx/store';
// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Album } from '../models/albums.model';
import * as album from '../actions/albums.action';
// import * as collection from '../actions/collection';

export function albumsReducer(state: Album[] = [], action: album.Actions) {
  switch (action.type) {
    case album.ADD:
      const index = state.findIndex((album) => album.id === action.data.id);

      if (index >= 0) {
        state[index] = action.data;
      }
      else {
        state.push(action.data);
      }

      return state;

    default:
      return state;
   }
}

