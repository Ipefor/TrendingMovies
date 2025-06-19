import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { AUTH_STATE, authReducer } from './auth.reducer';

@NgModule({
  providers: [AuthFacade],
  imports: [
    StoreModule.forFeature(AUTH_STATE, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStateModule {}
