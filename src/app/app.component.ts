import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SpotifyAuthenticationService } from './spotify/services/authentication/authentication.service';

import * as queryString from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public title = 'My first app';
  public isAuthenticated = false;

  constructor(
    private spotifyAuthenticationService: SpotifyAuthenticationService
   ) {}

  public ngOnInit (): void {
    // Authenticate with spotify
    const loginState = window.sessionStorage.getItem('spotifyLoginState');
    const urlHash = queryString.parse(window.location.hash.replace(/^\#/, '')); // remove leading #

    // Check if user has spotify login state from attemt to login
    if (loginState) {
      // Clean-up state
      window.sessionStorage.removeItem('spotifyLoginState');

      // Check if access token is provided by Spotify afther login
      if (urlHash && urlHash.access_token) {
        // Check state for extra security
        if (urlHash.state === loginState) {
          // Store token locally
          this.spotifyAuthenticationService.setToken(urlHash.access_token);

          // Set authentication flag
          this.isAuthenticated = true;
        }
      }
    }
    else {
      this.spotifyAuthenticationService.login();
    }
  }
}
