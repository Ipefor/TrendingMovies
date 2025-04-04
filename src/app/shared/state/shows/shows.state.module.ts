import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShowsEffects } from './shows.effects';
import { ShowsFacade } from './shows.facade';
import { SHOWS_STATE, showsReducer } from './shows.reducer';

@NgModule({
  providers: [ShowsFacade],
  imports: [
    StoreModule.forFeature(SHOWS_STATE, showsReducer),
    EffectsModule.forFeature([ShowsEffects]),
  ],
})
export class ShowsStateModule {}
