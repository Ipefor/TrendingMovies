import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [],
  templateUrl: './cardMovie.component.html',
  styleUrl: './cardMovie.component.css',
})
export class CardMovieComponent {
  private readonly router = inject(Router);
  @Input() movie!: Movie;

  toMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
