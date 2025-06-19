import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from '../../../core/models/media';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit{
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  @Input() object!: Media | null;
  isShow!: boolean;

  ngOnInit(): void {
    if (this.object && 'genres' in this.object) {
      this.isShow = true;
    } else{
      this.isShow = false
    }
  }

  goBack() {
    this.location.back();
  }
}
