import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private page: number = 1;

  private apiUrl = 'https://api.themoviedb.org/3/trending/movie/';

  private apiURLMovie = 'https://api.themoviedb.org/3/movie/';

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTg4ZmE5ZjNmNmE4MGExZGI4ZTM3NDljOGVlYWU1MSIsIm5iZiI6MTc0MDA2NTgwNS4wOTcsInN1YiI6IjY3Yjc0YzBkOWY3ZmIyYTc0MzY1ODY1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dCa3oQX1sQ8j2m-vvrWxNGPLuIrZWXurNBAxuJtbcAQ',
    }),
  };

  getTrendingMovies(trending: string, orden: string): Observable<any> {
    if(orden == "adelante"){
      this.page++
    } else if(orden == "atras"){
      if (this.page > 1) {
        this.page--;
      }
    }
    console.log(this.page)
    return this.http.get<any>(
      `${this.apiUrl}${trending}?language=es-ES&page=${this.page}`,
      this.httpOptions
    );
  }

  getMovie(id: number): Observable<any> {
    console.log(`${this.apiURLMovie}${id}`);
    return this.http.get<any>(
      `${this.apiURLMovie}${id}?language=es-ES`,
      this.httpOptions
    );
  }
}
