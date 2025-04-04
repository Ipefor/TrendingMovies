import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Media } from '../../../core/models/media';
import { MoviesService } from '../../services/movies.service';
import {
  ChangePage,
  ChangeTrending,
  LoadMovieDetail,
  LoadMovies,
} from './movies.actions';
import { getMoviesPage, getMoviesTrending } from './movies.selector';
import { API_URL_IMAGES } from '../../../core/constants/url';

@Injectable()
export class MoviesEffects {
  private readonly actions$ = inject(Actions);
  private readonly movieService = inject(MoviesService);
  private readonly store = inject(Store);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadMovies.load),
      concatLatestFrom(() => [
        this.store.select(getMoviesPage),
        this.store.select(getMoviesTrending),
      ]),
      mergeMap(([action, page, trending]) => {
        return this.movieService.getTrendingMovies(trending, page).pipe(
          map((data: any) => {
            const movies: Media[] = data.results.map((movie: any) => ({
              id: movie.id,
              releaseDate: movie.release_date,
              voteAverage: movie.vote_average,
              title: movie.title,
              synopsis: movie.overview,
              image: API_URL_IMAGES + movie.poster_path,
            }));

            return LoadMovies.success({ data: movies });
          }),
          catchError((error: Error) => of(LoadMovies.error({ error })))
        );
      })
    )
  );

  changePageAfterLoadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangePage.load),
      mergeMap(({ contador }) => {
        return of(ChangePage.success({ contador }));
      })
    )
  );

  changeTrendingAfterLoadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeTrending.load),
      mergeMap(({ trendingWord }) => {
        return of(ChangeTrending.success({ trendingWord }));
      })
    )
  );

  loadMovieDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadMovieDetail.load),
      mergeMap(({ id }) =>
        this.movieService.getMovie(id).pipe(
          map((data: any) => {
            const movie: Media = {
              id: data.id,
              releaseDate: data.release_date,
              voteAverage: data.vote_average,
              title: data.title,
              synopsis: data.overview,
              image: 'https://image.tmdb.org/t/p/w342' + data.poster_path,
            };

            return LoadMovieDetail.success({ data: movie });
          }),
          catchError((error: Error) => of(LoadMovieDetail.error({ error })))
        )
      )
    )
  );
}
