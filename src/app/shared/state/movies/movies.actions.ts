import {
  createActionGroup,
  emptyProps,
  props
} from '@ngrx/store';

// export const LoadMovies = createAction(
//   '[Movies] Load',
//   props<{ trending: string; page: number }>(),
// );

// export const LoadMoviesSucess = createAction(
//   '[Movies] Load Movies Sucess',
//   props<{ data: any }>(),
// );

// export const LoadMoviesError = createAction(
//   '[Movies] Load Movies Error',
//   props<{ error: Error }>(),
// );

export const LoadMovies = createActionGroup({
  source: '[Movies] Load',
  events: {
    Load: emptyProps(),
    Success: props<{ data: any }>(),
    Error: props<{ error: Error }>(),
  },
});

export const LoadMovieDetail = createActionGroup({
  source: '[MovieDetail] Load',
  events: {
    Load: props<{ id: number }>(),
    Success: props<{ data: any }>(),
    Error: props<{ error: Error }>(),
  },
});

export const ChangePage = createActionGroup({
  source: '[Movies Page] Change',
  events: {
    Load: props<{ contador: number }>(),
    Success: props<{ contador: number }>(),
    Error: props<{ error: Error }>(),
  },
});

export const ChangeTrending = createActionGroup({
  source: '[Movies Trending] Change',
  events: {
    Load: props<{ trendingWord: string }>(),
    Success: props<{ trendingWord: string }>(),
    Error: props<{ error: Error }>(),
  },
});
