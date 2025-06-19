import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import {
  CreateRequestToken,
  CreateSessionId,
  DeleteSessionId,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly localStorageService = inject(LocalStorageService);

  createRequestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateRequestToken.load),
      mergeMap(() =>
        this.authService.createRequestToken().pipe(
          map(({ request_token }) =>
            CreateRequestToken.success({ token: request_token })
          ),
          catchError((error: Error) => of(CreateRequestToken.error({ error })))
        )
      )
    )
  );

  requestTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateRequestToken.success),
        tap(({ token }) => {
          this.localStorageService.cleanLocalStorage();
          if (!this.localStorageService.getToken()) {
            this.localStorageService.setToken(token);
            this.authService.redirectAuth(token);
          }
        })
      ),
    { dispatch: false }
  );

  createSessionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateSessionId.load),
      mergeMap((action) => {
        const request_token = action.token;
        return this.authService.createSession(request_token).pipe(
          map((response: any) => {
            const sessionId = response.session_id;
            return CreateSessionId.success({ sessionId });
          }),
          catchError((error: Error) => of(CreateSessionId.error({ error })))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteSessionId.load),
      map(() => {
        const sessionId = null;
        return DeleteSessionId.success({ sessionId });
      }),
      catchError((error: Error) => of(DeleteSessionId.error({ error })))
    )
  );
}
