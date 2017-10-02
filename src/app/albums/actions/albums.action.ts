import { Action } from '@ngrx/store';

import { Album } from '../models/albums.model';

export const ADD = '[Album] Add';
// export const SELECT = '[Album] Select';

export class Add implements Action {
  readonly type = ADD;

  constructor (public data: Album) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */

export type Actions = Add;
