import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CreateRequestToken,
  CreateSessionId,
  DeleteSessionId,
} from './auth.actions';
import {
  getRequestToken,
  getRequestTokenError,
  getRequestTokenLoading,
  getSessionId,
} from './auth.selector';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  token$ = this.store.pipe(select(getRequestToken));
  error$ = this.store.pipe(select(getRequestTokenError));
  loading$ = this.store.pipe(select(getRequestTokenLoading));
  sessionId$ = this.store.pipe(select(getSessionId));

  createRequestToken() {
    this.store.dispatch(CreateRequestToken.load());
  }

  createSessionId(token: string) {
    this.store.dispatch(CreateSessionId.load({ token }));
  }

  deleteSessionId() {
    this.store.dispatch(DeleteSessionId.load());
  }
}
