import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { MoviesFacade } from '../../shared/state/movies/movies.facade';
import { Media } from '../../core/models/media';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CardComponent, CommonModule, FormsModule],
  providers: [MoviesFacade],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  private readonly moviesFacade = inject(MoviesFacade);
  movies$ = this.moviesFacade.movies$;
  page$ = this.moviesFacade.page$;
  trending$ = this.moviesFacade.trending$;
  trending!: string;
  movie!: Media[] | null;
  page!: number;

  ngOnInit(): void {
    this.trending$.subscribe((trending) => {
      this.trending = trending;
    });

    this.page$.subscribe((page) => {
      this.page = page;
    });

    this.movies$.subscribe((movie) => {
      this.movie = movie;
    });

    this.moviesFacade.loadMovies();
  }

  cambiarTendencia() {
    this.moviesFacade.changeTrending(this.trending)
    this.moviesFacade.loadMovies();
  }

  nextPage() {
    this.moviesFacade.changePage(1);
    this.moviesFacade.loadMovies();
  }

  previousPage() {
    if (this.page <= 1) {
      return;
    }
    this.moviesFacade.changePage(-1);
    this.moviesFacade.loadMovies();
  }
}
