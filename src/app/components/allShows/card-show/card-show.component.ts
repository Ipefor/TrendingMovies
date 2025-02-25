import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from '../../../models/show';

@Component({
  selector: 'app-card-show',
  standalone: true,
  imports: [],
  templateUrl: './card-show.component.html',
  styleUrl: './card-show.component.css'
})
export class CardShowComponent {
  private readonly router = inject(Router);
  @Input() show!: Show;

  toMovie(id: number) {
    this.router.navigate(['/show', id]);
  }
}
