import { CreateRequestToken, CreateSessionId } from '../auth.actions';
import { authReducer, initialAuthState } from '../auth.reducer';

describe('AuthReducer', () => {
  it('returns a default state', () => {
    const action = { type: 'Unknown' };
    const state = authReducer(initialAuthState, action);
    const newState = {
      loading: false,
      request_token: null,
      error: null,
      sessionId_state: null,
    };
    expect(state).toEqual(newState);
  });

  describe('createRequestToken', () => {
    it('getRequestTokenLoad', () => {
      const action = CreateRequestToken.load();
      const state = authReducer(initialAuthState, action);
      const newState = {
        loading: true,
        request_token: null,
        error: null,
        sessionId_state: null,
      };
      expect(state).toEqual(newState);
    });

    it('getRequestTokenSuccess', () => {
      const action = CreateRequestToken.success({
        token: 'hola123',
      });
      const state = authReducer(initialAuthState, action);
      const newState = {
        loading: false,
        request_token: 'hola123',
        error: null,
        sessionId_state: null,
      };
      expect(state).toEqual(newState);
    });

    it('getRequestTokenError', () => {
      const action = CreateRequestToken.error({
        error: new Error('Failed to create token'),
      });
      const state = authReducer(initialAuthState, action);
      const newState = {
        loading: false,
        request_token: null,
        error: new Error('Failed to create token'),
        sessionId_state: null,
      };
      expect(state).toEqual(newState);
    });
  });

  describe('createSessionId', () => {
    it('getSessionIdLoad', () => {
      const action = CreateSessionId.load({ token: 'qwe123' });
      const state = authReducer(initialAuthState, action);
      const newState = {
        loading: true,
        request_token: null,
        error: null,
        sessionId_state: null,
      };
      expect(state).toEqual(newState);
    });

    it('getSessionIdSuccess', () => {
      const action = CreateSessionId.success({ sessionId: 'qwe123' });
      const state = authReducer(initialAuthState, action);
      const newState = {
        loading: false,
        request_token: null,
        error: null,
        sessionId_state: 'qwe123',
      };
      expect(state).toEqual(newState);
    });
    
    it('getSessionIdError', () => {
      const action = CreateSessionId.error({
        error: new Error('Failed to create sessionId'),
      });
      const state = authReducer(initialAuthState, action);
      const newState = {
        loading: false,
        request_token: null,
        error: new Error('Failed to create sessionId'),
        sessionId_state: null,
      };
      expect(state).toEqual(newState);
    });
  });
});
