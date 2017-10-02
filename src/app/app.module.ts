import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AlbumsModule } from './albums/albums.module';
import { SaModule } from './sa/sa.module';
import { SpotifyModule } from './spotify/spotify.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AlbumsModule,
    SaModule,
    SpotifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
