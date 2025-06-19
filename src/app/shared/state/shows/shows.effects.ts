import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Media } from '../../../core/models/media';
import { ShowsService } from '../../services/shows.service';
import {
  ChangePage,
  ChangeTrending,
  LoadShowDetail,
  LoadShows,
} from './shows.actions';
import { getShowsPage, getShowsTrending } from './shows.selector';
import { API_URL_IMAGES } from '../../../core/constants/url';

@Injectable()
export class ShowsEffects {
  private readonly actions$ = inject(Actions);
  private readonly showsService = inject(ShowsService);
  private readonly store = inject(Store);

  loadShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadShows.load),
      concatLatestFrom(() => [
        this.store.select(getShowsPage),
        this.store.select(getShowsTrending),
      ]),
      mergeMap(([action, page, trending]) => {
        return this.showsService.getTrendingShows(trending, page).pipe(
          map((data: any) => {
            const shows: Media = data.results.map((show: any) => ({
              id: show.id,
              releaseDate: show.first_air_date,
              voteAverage: show.vote_average,
              title: show.name,
              synopsis: show.overview,
              image: 'https://image.tmdb.org/t/p/w500' + show.poster_path,
              originCountry: show.origin_country,
              genres: show.genres_id,
            }));

            return LoadShows.success({ data: shows });
          }),
          catchError((error: Error) => of(LoadShows.error({ error })))
        );
      })
    )
  );

  changePageAfterLoadShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangePage.load),
      mergeMap(({ contador }) => {
        return of(ChangePage.success({ contador }));
      })
    )
  );

  changeTrendingAfterLoadShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeTrending.load),
      mergeMap(({ trendingWord }) => {
        return of(ChangeTrending.success({ trendingWord }));
      })
    )
  );

  loadShowDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadShowDetail.load),
      mergeMap(({ id }) =>
        this.showsService.getShow(id).pipe(
          map((data: any) => {
            const show: Media = {
              id: data.id,
              releaseDate: data.first_air_date,
              voteAverage: data.vote_average,
              title: data.name,
              synopsis: data.overview,
              image: API_URL_IMAGES + data.poster_path,
              originCountry: data.origin_country,
              genres: data.genres.map((genre: any) => genre.name),
            };

            return LoadShowDetail.success({ data: show });
          }),
          catchError((error: Error) => of(LoadShowDetail.error({ error })))
        )
      )
    )
  );
}
