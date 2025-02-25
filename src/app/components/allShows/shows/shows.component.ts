import { Component, inject } from '@angular/core';
import { Show } from '../../../models/show';
import { ShowsService } from '../../../services/shows.service';
import { CardShowComponent } from '../card-show/card-show.component';
import { Genre } from '../../../models/genre';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CardShowComponent, FormsModule],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css',
})
export class ShowsComponent {
  private readonly moviesService = inject(ShowsService);
  private readonly miRutaActiva = inject(ActivatedRoute);
  private readonly router = inject(Router);

  shows!: Show[];
  tendenciaFiltrada!: string;
  page!: number ;

  ngOnInit(): void {
      this.tendenciaFiltrada = this.miRutaActiva.snapshot.paramMap.get('tendencia');
      this.page = this.miRutaActiva.snapshot.paramMap.get('page');
      console.log(this.page);
      this.inicializarSeries(this.tendenciaFiltrada, this.page);
  }

  inicializarSeries(tendencia: string, page: number) {
    this.moviesService.getTrendingShows(tendencia, page).subscribe((data) => {
      this.shows = data.results.map((show: any) => {
        const newShow: Show = {
          id: show.id,
          firstAirDate: show.first_air_date,
          voteAverage: show.vote_average,
          name: show.name,
          synopsis: show.overview,
          image: 'https://image.tmdb.org/t/p/w500' + show.poster_path,
          originCountry: show.origin_country,
          genres: show.genres_id,
        };
        return newShow;
      });
    });
  }

  cambiarTendencia(): void {
    this.router.navigate([], {
      relativeTo: this.miRutaActiva,
      queryParams: { tendencia: this.tendenciaFiltrada, page: this.page },
      queryParamsHandling: 'merge'
    }).then(() => {
      this.miRutaActiva.queryParams.subscribe((params) => {
        this.inicializarSeries(this.tendenciaFiltrada, this.page);
      });
    });
  }

  nextPage(): void {
    this.miRutaActiva.queryParams.subscribe((params) => {
      const currentPage = +params['page'] || 1;
      const nextPage = currentPage + 1;
      this.router.navigate([], {
        relativeTo: this.miRutaActiva,
        queryParams: {tendencia: this.tendenciaFiltrada, page: nextPage },
        queryParamsHandling: 'merge'
      }).then(() => {
        this.inicializarSeries(this.tendenciaFiltrada, nextPage);
      });
    });
  }

  previousPage(): void {
    this.miRutaActiva.queryParams.subscribe((params) => {
      const currentPage = +params['page'] || 1;
      if (currentPage === 1) {
        return;
      }
      const previousPage = currentPage - 1;
      this.router.navigate([], {
        relativeTo: this.miRutaActiva,
        queryParams: { page: previousPage },
        queryParamsHandling: 'merge'
      }).then(() => {
        this.inicializarSeries(params['tendencia'], previousPage);
      });
    });
  }

}

