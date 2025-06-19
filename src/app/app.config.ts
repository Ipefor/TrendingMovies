import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptor/auth.interceptor';
import { AuthEffects } from './shared/state/auth/auth.effects';
import { authReducer } from './shared/state/auth/auth.reducer';
import { MoviesEffects } from './shared/state/movies/movies.effects';
import { moviesReducer } from './shared/state/movies/movies.reducer';
import { ShowsEffects } from './shared/state/shows/shows.effects';
import { showsReducer } from './shared/state/shows/shows.reducer';
import { AuthFacade } from './shared/state/auth/auth.facade';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ movies: moviesReducer, shows: showsReducer, auth: authReducer}),
    provideEffects([MoviesEffects, ShowsEffects, AuthEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    AuthFacade
  ],
};
