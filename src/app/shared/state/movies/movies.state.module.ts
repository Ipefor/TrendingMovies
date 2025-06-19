import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MoviesEffects } from './movies.effects';
import { MoviesFacade } from './movies.facade';
import { MOVIES_STATE, moviesReducer } from './movies.reducer';

@NgModule({
  providers: [MoviesFacade],
  imports: [
    StoreModule.forFeature(MOVIES_STATE, moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
  ],
})
export class MoviesStateModule {}
