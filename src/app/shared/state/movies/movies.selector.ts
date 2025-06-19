import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MOVIES_STATE, MoviesState } from './movies.reducer';

const movieStateSelector = createFeatureSelector<MoviesState>(MOVIES_STATE);

export const getMovies = createSelector(
  movieStateSelector,
  (state) => state.movies
);

export const getMoviesLoading = createSelector(
  movieStateSelector,
  (state) => state.loading
);

export const getMoviesError = createSelector(
  movieStateSelector,
  (state) => state.error
);

export const getMovieDetail = createSelector(
  movieStateSelector,
  (state) => state.movieDetail
);

export const getMoviesPage = createSelector(
  movieStateSelector,
  (state) => state.page
);

export const getMoviesTrending = createSelector(
  movieStateSelector,
  (state) => state.trending
);
