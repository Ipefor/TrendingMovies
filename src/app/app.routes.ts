import { Routes } from '@angular/router';
import { MoviesComponent } from './components/allMovies/movies/movies.component';
import { MovieComponent } from './components/allMovies/movie/movie.component';
import { ShowsComponent } from './components/allShows/shows/shows.component';
import { ShowComponent } from './components/allShows/show/show.component';
import { HomePageComponent } from './components/home-page/home-page.component';


export const routes: Routes = [
  {
    path:'', component: HomePageComponent
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'shows',
    component: ShowsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'show/:id',
    component: ShowComponent,
  },
];
