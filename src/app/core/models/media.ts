import { Movie } from './movie';
import { Show } from './show';

export interface Media extends Movie, Show {
  id: number;
  releaseDate: string;
  voteAverage: number;
  title: string;
  synopsis: string;
  image: string;
}
