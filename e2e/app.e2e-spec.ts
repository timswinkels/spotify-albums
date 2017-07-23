import { SpotifyAlbumsPage } from './app.po';

describe('spotify-albums App', () => {
  let page: SpotifyAlbumsPage;

  beforeEach(() => {
    page = new SpotifyAlbumsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
