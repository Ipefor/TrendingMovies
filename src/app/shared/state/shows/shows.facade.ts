import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ChangePage,
  ChangeTrending,
  LoadShowDetail,
  LoadShows,
} from './shows.actions';
import {
  getShowDetail,
  getShows,
  getShowsError,
  getShowsLoading,
  getShowsPage,
  getShowsTrending,
} from './shows.selector';

@Injectable()
export class ShowsFacade {
  private readonly store = inject(Store);

  shows$ = this.store.pipe(select(getShows));
  error$ = this.store.pipe(select(getShowsError));
  loading$ = this.store.pipe(select(getShowsLoading));
  page$ = this.store.pipe(select(getShowsPage));
  showDetail$ = this.store.pipe(select(getShowDetail));
  trending$ = this.store.pipe(select(getShowsTrending));

  loadShows() {
    this.store.dispatch(LoadShows.load());
  }

  loadShowDetail(id: number) {
    this.store.dispatch(LoadShowDetail.load({ id }));
  }

  changePage(contador: number) {
    this.store.dispatch(ChangePage.load({ contador }));
  }

  changeTrending(trendingWord: string) {
    this.store.dispatch(ChangeTrending.load({ trendingWord }));
  }
}
