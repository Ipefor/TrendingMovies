import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from '../../shared/services/shows.service';
import { Show } from '../../core/models/show';
import { CommonModule, Location } from '@angular/common';
import { Genre } from '../../core/models/genre';
import { ShowsFacade } from '../../shared/state/shows/shows.facade';
import { DetailComponent } from "../../shared/components/detail/detail.component";
import { Media } from '../../core/models/media';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, DetailComponent],
  templateUrl: './show-detail.component.html',
  providers: [ShowsFacade],
  styleUrl: './show-detail.component.css',
})
export class ShowDetailComponent implements OnInit {
  private readonly miRutaActiva = inject(ActivatedRoute);
  private readonly showsFacade = inject(ShowsFacade);
  private readonly location = inject(Location);
  show$ = this.showsFacade.showDetail$;
  show: Media | null = null;

  ngOnInit() {
    this.miRutaActiva.params.subscribe((params) => {
      this.showsFacade.loadShowDetail(params['id']);
    });

    this.show$.subscribe((show) => {
      console.log({ show });
      this.show = show;
    });
  }

  goBack() {
    this.location.back();
  }
}
