import { createReducer, on } from '@ngrx/store';
import {
  CreateRequestToken,
  CreateSessionId,
  DeleteSessionId,
} from './auth.actions';

export interface AuthState {
  loading: boolean;
  request_token: string | null;
  error: Error | null;
  sessionId_state: string | null;
}

export const initialAuthState: AuthState = {
  loading: false,
  request_token: null,
  error: null,
  sessionId_state: null,
};

export const AUTH_STATE = 'auth';

export const authReducer = createReducer(
  initialAuthState,
  on(CreateRequestToken.load, (state) => ({
    ...state,
    loading: true,
  })),

  on(CreateRequestToken.success, (state, { token }) => ({
    ...state,
    loading: false,
    request_token: token,
  })),

  on(CreateRequestToken.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CreateSessionId.load, (state) => ({
    ...state,
    loading: true,
  })),

  on(CreateSessionId.success, (state, { sessionId }) => ({
    ...state,
    loading: false,
    sessionId_state: sessionId,
  })),

  on(CreateSessionId.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DeleteSessionId.load, (state) => ({
    ...state,
    loading: true,
  })),

  on(DeleteSessionId.success, (state, { sessionId }) => ({
    ...state,
    loading: false,
    sessionId_state: sessionId,
  })),

  on(DeleteSessionId.error, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
