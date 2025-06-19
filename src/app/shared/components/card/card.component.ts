import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from '../../../core/models/media';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly router = inject(Router);
  @Input() object!: Media;

  toDetailPage(): void {
    if ('genres' in this.object) {
      this.router.navigate(['/show', this.object.id]);
      return;
    }

    this.router.navigate(['/movie', this.object.id]);
  }
}
