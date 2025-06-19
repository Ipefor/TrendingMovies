import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_MOVIES, API_URL_TRENDING_MOVIES } from '../../core/constants/url';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);

  getTrendingMovies(trending: string, page: number): Observable<any> {
    return this.http.get<any>(
      `${API_URL_TRENDING_MOVIES}${trending}?language=es-ES&page=${page}`,
    );
  }

  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL_MOVIES}${id}?language=es-ES`);
  }
}
