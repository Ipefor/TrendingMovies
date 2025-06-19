import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  API_URL_SHOW,
  API_URL_TRENDING_SHOW,
} from './../../core/constants/url';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private readonly http = inject(HttpClient);

  getTrendingShows(trending: string, page: number): Observable<any> {
    return this.http.get<any>(
      `${API_URL_TRENDING_SHOW}${trending}?language=es-ES&page=${page}`
    );
  }

  getShow(id: number): Observable<any> {
    console.log(API_URL_SHOW);
    return this.http.get<any>(`${API_URL_SHOW}${id}?language=es-ES`);
  }
}
