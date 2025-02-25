import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from '../../../services/shows.service';
import { Show } from '../../../models/show';
import { Location } from '@angular/common';
import { Genre } from '../../../models/genre';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit{
  private readonly miRutaActiva = inject(ActivatedRoute);
  private readonly showsService = inject(ShowsService);
  private readonly location = inject(Location);
  public show!: Show;

  ngOnInit() {
    this.miRutaActiva.params.subscribe((params) => {
      this.showsService.getShow(params['id']).subscribe((show) => {
        this.show = {
          id: show.id,
          firstAirDate: show.first_air_date,
          voteAverage: show.vote_average,
          name: show.name,
          synopsis: show.overview,
          image: 'https://image.tmdb.org/t/p/w500' + show.poster_path,
          originCountry: show.origin_country,
          genres: show.genres.map((genre: Genre) => genre.name)
        };
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
