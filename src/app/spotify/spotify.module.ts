import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SpotifyAuthenticationService } from './services/authentication/authentication.service';
import { SpotifyApiTokenInterceptor } from './interceptors/api-token/api-token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SpotifyAuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyApiTokenInterceptor, multi: true }
  ]
})
export class SpotifyModule { }
