import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CreateRequestToken = createActionGroup({
  source: '[Auth] Request Token',
  events: {
    Load: emptyProps(),
    Success: props<{ token: string }>(),
    Error: props<{ error: Error }>(),
  },
});

export const CreateSessionId = createActionGroup({
  source: '[Auth] Session ID',
  events: {
    Load: props<{ token: string }>(),
    Success: props<{ sessionId: string }>(),
    Error: props<{ error: Error }>(),
  },
});

export const DeleteSessionId = createActionGroup({
  source: '[Auth] Delete Session ID',
  events: {
    Load: emptyProps(),
    Success: props<{ sessionId: null }>(),
    Error: props<{ error: Error }>(),
  },
});
