import { createReducer, on } from '@ngrx/store';
import { Media } from '../../../core/models/media';
import {
  ChangePage,
  ChangeTrending,
  LoadMovieDetail,
  LoadMovies,
} from './movies.actions';

export interface MoviesState {
  movies: Media[] | null;
  movieDetail: Media | null;
  error: Error | null;
  loading: boolean;
  page: number;
  trending: string;
}

export const initialMovieState: MoviesState = {
  movies: null,
  movieDetail: null,
  error: null,
  loading: false,
  page: 1,
  trending: 'week',
};

export const MOVIES_STATE = 'movies';

export const moviesReducer = createReducer(
  initialMovieState,
  on(LoadMovies.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(LoadMovies.success, (state, { data }) => ({
    ...state,
    loading: false,
    movies: data,
  })),
  on(LoadMovies.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LoadMovieDetail.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(LoadMovieDetail.success, (state, { data }) => ({
    ...state,
    loading: false,
    movieDetail: data,
  })),
  on(LoadMovieDetail.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ChangePage.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(ChangePage.success, (state, { contador }) => ({
    ...state,
    loading: false,
    page: state.page + contador,
  })),
  on(ChangePage.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ChangeTrending.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(ChangeTrending.success, (state, { trendingWord }) => ({
    ...state,
    loading: false,
    trending: trendingWord,
  })),
  on(ChangeTrending.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
