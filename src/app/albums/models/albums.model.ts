export interface Album {
  id: string;
  title: string;
  artist: string;
  type: 'album' | 'compilation' | 'single';
  year: number;
  imageUrl: string;
}
