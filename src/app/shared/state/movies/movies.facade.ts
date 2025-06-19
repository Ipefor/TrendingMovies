import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ChangePage,
  ChangeTrending,
  LoadMovieDetail,
  LoadMovies,
} from './movies.actions';
import {
  getMovieDetail,
  getMovies,
  getMoviesError,
  getMoviesLoading,
  getMoviesPage,
  getMoviesTrending,
} from './movies.selector';

@Injectable()
export class MoviesFacade {
  private readonly store = inject(Store);

  movies$ = this.store.pipe(select(getMovies));
  error$ = this.store.pipe(select(getMoviesError));
  loading$ = this.store.pipe(select(getMoviesLoading));
  page$ = this.store.pipe(select(getMoviesPage));
  movieDetail$ = this.store.pipe(select(getMovieDetail));
  trending$ = this.store.pipe(select(getMoviesTrending));

  loadMovies() {
    this.store.dispatch(LoadMovies.load());
  }

  loadMovieDetail(id: number) {
    this.store.dispatch(LoadMovieDetail.load({ id }));
  }

  changePage(contador: number) {
    this.store.dispatch(ChangePage.load({ contador }));
  }

  changeTrending(trendingWord: string) {
    this.store.dispatch(ChangeTrending.load({ trendingWord }));
  }
}
