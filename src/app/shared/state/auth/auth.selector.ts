import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STATE, AuthState } from './auth.reducer';

const authStateSelector = createFeatureSelector<AuthState>(AUTH_STATE);

export const getRequestToken = createSelector(
  authStateSelector,
  (state) => state.request_token
);

export const getRequestTokenLoading = createSelector(
  authStateSelector,
  (state) => state.loading
);

export const getRequestTokenError = createSelector(
  authStateSelector,
  (state) => state.error
);

export const getSessionId = createSelector(
  authStateSelector,
  (state) => state.sessionId_state
);

export const getSessionIdLoading = createSelector(
  authStateSelector,
  (state) => state.loading
);

export const getSessionIdError = createSelector(
  authStateSelector,
  (state) => state.error
);
