import { createActionGroup, emptyProps, props } from '@ngrx/store';
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

export const LoadShows = createActionGroup({
  source: '[Shows] Load',
  events: {
    Load: emptyProps(),
    Success: props<{ data: any }>(),
    Error: props<{ error: Error }>(),
  },
});

export const LoadShowDetail = createActionGroup({
  source: '[ShowDetail] Load',
  events: {
    Load: props<{ id: number }>(),
    Success: props<{ data: any }>(),
    Error: props<{ error: Error }>(),
  },
});

export const ChangePage = createActionGroup({
  source: '[Shows Page] Change',
  events: {
    Load: props<{ contador: number }>(),
    Success: props<{ contador: number }>(),
    Error: props<{ error: Error }>(),
  },
});

export const ChangeTrending = createActionGroup({
  source: '[Shows Trending] Change',
  events: {
    Load: props<{ trendingWord: string }>(),
    Success: props<{ trendingWord: string }>(),
    Error: props<{ error: Error }>(),
  },
});
