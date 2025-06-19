import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { ShowsFacade } from '../../shared/state/shows/shows.facade';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule],
  providers: [ShowsFacade],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css',
})
export class ShowsComponent {
  private readonly showsFacade = inject(ShowsFacade);
  shows$ = this.showsFacade.shows$;
  page$ = this.showsFacade.page$;
  trending$ = this.showsFacade.trending$;
  trending!: string;
  page!: number;

  ngOnInit(): void {
    this.trending$.subscribe((trending) => {
      this.trending = trending;
    });
    this.showsFacade.loadShows();
    this.page$.subscribe((page) => {
      this.page = page;
    });
  }

  cambiarTendencia() {
    this.showsFacade.changeTrending(this.trending);
    this.showsFacade.loadShows();
  }

  nextPage() {
    this.showsFacade.changePage(1);
    this.showsFacade.loadShows();
  }

  previousPage() {
    if (this.page <= 1) {
      return;
    }
    this.showsFacade.changePage(-1);
    this.showsFacade.loadShows();
  }
}
