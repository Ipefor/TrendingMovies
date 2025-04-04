import { Routes } from '@angular/router';
import { MoviesComponent } from './features/movies/movies.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { ShowsComponent } from './features/shows/shows.component';
import { ShowDetailComponent } from './features/show-detail/show-detail.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { CallbackComponent } from './features/callback/callback.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'shows',
    component: ShowsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'show/:id',
    component: ShowDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },

  //TODO:lazyloading
];
