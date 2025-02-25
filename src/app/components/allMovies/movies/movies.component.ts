import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { CardMovieComponent } from '../cardMovie/cardMovie.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../models/movie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CardMovieComponent, CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);
  movies!: Movie[];
  tendenciaFiltrada!: string;

  ngOnInit(): void {
    this.tendenciaFiltrada = 'week'
    this.inicializarPeliculas(this.tendenciaFiltrada, "permanecer");
  }

  inicializarPeliculas(tendencia: string, orden: string) {
    this.moviesService.getTrendingMovies(tendencia, orden).subscribe((data) => {
      this.movies = data.results.map((movie: any) => {
        const newMovie: Movie = {
          id: movie.id,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          title: movie.title,
          synopsis: movie.overview,
          image: 'https://image.tmdb.org/t/p/w342' + movie.poster_path,
        };

        return newMovie;
      });

      console.log(this.movies);
    });
  }
  cambiarTendencia() {
    this.inicializarPeliculas(this.tendenciaFiltrada, "permanecer");
  }

  nextPage(){
    this.inicializarPeliculas(this.tendenciaFiltrada, "adelante")
  }


  previousPage(){
    this.inicializarPeliculas(this.tendenciaFiltrada, "atras")
  }
}
