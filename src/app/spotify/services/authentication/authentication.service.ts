import { Injectable } from '@angular/core';

import * as Uuid from 'uuid/v4';

@Injectable()
export class SpotifyAuthenticationService {

  private clientId = 'b2515beb2938402584a159fb937706af';
  private token: string;

  constructor() {}

  public login(): void {
    // Generate state
    const state = Uuid();

    // Store state into local storage
    window.sessionStorage.setItem('spotifyLoginState', state);

    // Start spotify implicit grant login flow
    // https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow
    document.location.href = `https://accounts.spotify.com/authorize` +
      `?client_id=${this.clientId}` +
      `&response_type=token` +
      `&redirect_uri=${encodeURI(document.location.origin)}` +
      `&scope=${encodeURI('user-library-read')}` +
      `&state=${encodeURI(state)}`;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}
