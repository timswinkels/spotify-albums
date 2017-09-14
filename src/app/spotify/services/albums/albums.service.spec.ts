import { TestBed, inject } from '@angular/core/testing';

import { SpotifyAlbumsService } from './albums.service';

describe('AlbumsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAlbumsService]
    });
  });

  it('should be created', inject([SpotifyAlbumsService], (service: SpotifyAlbumsService) => {
    expect(service).toBeTruthy();
  }));
});
