import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import {Observable} from 'rxjs/Rx';

import { SpotifyAuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class SpotifyApiTokenInterceptor implements HttpInterceptor {

  constructor (
    private authenticationService: SpotifyAuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();

    // Return modified request when request is Spotify API request
    if (req.url.search(/^https\:\/\/api\.spotify\.com/) >= 0 && token) {
      return next.handle(req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }));
    }

    return next.handle(req);
  }

  // Todo: intercept failed api call due to 401 and handle appropriatly
}
