import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

describe('Auth Service', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  const urlBase = 'https://api.themoviedb.org/3/';
  let originalLocation: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    originalLocation = window.location.href;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  afterEach(() => {
    httpTestingController.verify();
    window.location.href = originalLocation;
  });

  it('creates auth service', () => {
    expect(authService).toBeTruthy();
  });

  describe('createRequestToken', () => {
    it('should return a request token', () => {
      let tokenResponse: string | undefined;
      const mockTokenResponse: string = 'jhasdufqw8ev8q3ebviuaedbf';

      authService.createRequestToken().subscribe((response) => {
        tokenResponse = response;
      });

      const req = httpTestingController.expectOne(
        `${urlBase}authentication/token/new`
      );
      req.flush(mockTokenResponse);
      expect(tokenResponse).toEqual(mockTokenResponse);
    });
  });

  describe('redirectAuth', () => {
    //NO ENTIENDO ESTE TEST, REVISAR
    it('should redirect to the correct URL', () => {
      const token = 'testToken';
      const expectedUrl = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:4200/callback`;

      authService.redirectAuth(token);

      expect(window.location.href).toBe(expectedUrl);
    });
  });

  describe('createSession', () => {
    it('should return a session id', () => {
      let sessionId: string | undefined;
      const token: string = '123532ahsrht';
      let mockSessionId: string = 'uqecdbfyqerfgy34';

      authService.createSession(token).subscribe((response) => {
        sessionId = response;
      });

      const req = httpTestingController.expectOne(
        `${urlBase}authentication/session/new`
      );
      req.flush(mockSessionId);
      expect(sessionId).toEqual(mockSessionId);
    });
  });
});
