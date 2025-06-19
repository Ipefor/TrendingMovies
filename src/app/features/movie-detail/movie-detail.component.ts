import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../shared/services/movies.service';
import { Movie } from '../../core/models/movie';
import { Location } from '@angular/common';
import { MoviesFacade } from '../../shared/state/movies/movies.facade';
import { DetailComponent } from "../../shared/components/detail/detail.component";
import { Media } from '../../core/models/media';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [DetailComponent],
  providers: [MoviesFacade],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly moviesFacade = inject(MoviesFacade);
  private readonly location = inject(Location);
  movie$ = this.moviesFacade.movieDetail$;
  movie: Media | null = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesFacade.loadMovieDetail(params['id']);
    });

    this.movie$.subscribe((movie) => {
      this.movie = movie;
    });
  }

  goBack() {
    this.location.back();
  }
}
