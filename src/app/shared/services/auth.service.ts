import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  API_URL_REQUEST_TOKEN,
  API_URL_SESSION_ID,
} from '../../core/constants/url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  createRequestToken(): Observable<any> {
    return this.http.get<any>(API_URL_REQUEST_TOKEN);
  }

  redirectAuth(token: string): void {
    const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:4200/callback`;
    window.location.href = url;
  }
  createSession(requestToken: string | null): Observable<any> {
    return this.http.post<any>(API_URL_SESSION_ID, {
      request_token: requestToken,
    });
  }
}
