import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHOWS_STATE, ShowsState } from './shows.reducer';

const showStateSelector = createFeatureSelector<ShowsState>(SHOWS_STATE);

export const getShows = createSelector(
  showStateSelector,
  (state) => state.shows
);

export const getShowsLoading = createSelector(
  showStateSelector,
  (state) => state.loading
);

export const getShowsError = createSelector(
  showStateSelector,
  (state) => state.error
);

export const getShowDetail = createSelector(
  showStateSelector,
  (state) => state.showDetail
);

export const getShowsPage = createSelector(
  showStateSelector,
  (state) => state.page
);

export const getShowsTrending = createSelector(
  showStateSelector,
  (state) => state.trending
);
