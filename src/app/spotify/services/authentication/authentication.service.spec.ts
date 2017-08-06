import { TestBed, inject } from '@angular/core/testing';

import { SpotifyAuthenticationService } from './authentication.service';

describe('SpotifyAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAuthenticationService]
    });
  });

  it('should be created', inject([SpotifyAuthenticationService], (service: SpotifyAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
