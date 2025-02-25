import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  private readonly miRutaActiva = inject(ActivatedRoute);
  private readonly moviesService = inject(MoviesService);
  private readonly location = inject(Location);
  public movie!: Movie;

  ngOnInit() {
    this.miRutaActiva.params.subscribe((params) => {
      this.moviesService.getMovie(params['id']).subscribe((movie) => {
        console.log(movie);
        this.movie = {
          id: movie.id,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          title: movie.title,
          synopsis: movie.overview,
          image: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
        };
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
