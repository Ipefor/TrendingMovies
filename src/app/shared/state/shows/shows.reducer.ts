import { createReducer, on } from '@ngrx/store';
import { Media } from '../../../core/models/media';
import {
  ChangePage,
  ChangeTrending,
  LoadShowDetail,
  LoadShows,
} from './shows.actions';

export interface ShowsState {
  shows: Media[] | null;
  showDetail: Media | null;
  error: Error | null;
  loading: boolean;
  page: number;
  trending: string;
}

export const initialShowState: ShowsState = {
  shows: null,
  showDetail: null,
  error: null,
  loading: false,
  page: 1,
  trending: 'week',
};

export const SHOWS_STATE = 'shows';

export const showsReducer = createReducer(
  initialShowState,
  on(LoadShows.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(LoadShows.success, (state, { data }) => ({
    ...state,
    loading: false,
    shows: data,
  })),
  on(LoadShows.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LoadShowDetail.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(LoadShowDetail.success, (state, { data }) => ({
    ...state,
    loading: false,
    showDetail: data,
  })),
  on(LoadShowDetail.error, (state, { error }) => ({
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
