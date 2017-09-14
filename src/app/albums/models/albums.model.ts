export interface Album {
  title: string;
  artist: string;
  type: 'album' | 'compilation' | 'single';
  year: number;
  imageUrl: string;
}
