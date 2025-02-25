import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private readonly http = inject(HttpClient);

  private apiUrl =
    'https://api.themoviedb.org/3/trending/tv/';

  private apiURLShow = 'https://api.themoviedb.org/3/tv/'

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTg4ZmE5ZjNmNmE4MGExZGI4ZTM3NDljOGVlYWU1MSIsIm5iZiI6MTc0MDA2NTgwNS4wOTcsInN1YiI6IjY3Yjc0YzBkOWY3ZmIyYTc0MzY1ODY1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dCa3oQX1sQ8j2m-vvrWxNGPLuIrZWXurNBAxuJtbcAQ',
    }),
  };

  getTrendingShows(trending: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${trending}?language=es-ES&page=${page}`, this.httpOptions);
  }

  getShow(id: number): Observable<any>{
    console.log(`${this.apiURLShow}${id}`)
    return this.http.get<any>(`${this.apiURLShow}${id}?language=es-ES`, this.httpOptions)
  }

}
