import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { MovieResponseApi } from '../../../core/models/modelsTest/movieResponseApi';
import { MovieDetails } from '../../../core/models/modelsTest/movieDetails';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let httpTestingController: HttpTestingController;
  const baseUrlTrending = 'https://api.themoviedb.org/3/trending/movie/';
  const baseUrlMovie = 'https://api.themoviedb.org/3/movie/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    moviesService = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(moviesService).toBeTruthy();
  });

  describe('getTrendingMovies', () => {
    it('should return a list of trending movies', () => {
      let moviesResponse: MovieResponseApi[] | undefined;
      const page = 1;
      const trending = 'week';
      const mockMovieResponse: MovieResponseApi[] = [
        {
          page: 1,
          results: [
            {
              adult: false,
              backdrop_path: '/path/to/backdrop.jpg',
              id: 1,
              title: 'Sample Movie',
              original_language: 'en',
              original_title: 'Sample Movie Original',
              overview: 'This is a sample movie overview.',
              poster_path: '/path/to/poster.jpg',
              media_type: 'movie',
              genre_ids: [12, 18],
              popularity: 100.5,
              release_date: '2025-03-10',
              video: false,
              vote_average: 8.5,
              vote_count: 2000,
            },
          ],
          total_pages: 10,
          total_results: 100,
        },
      ];

      moviesService.getTrendingMovies(trending, page).subscribe((response) => {
        moviesResponse = response;
      });

      const req = httpTestingController.expectOne(
        `${baseUrlTrending}${trending}?language=es-ES&page=${page}`
      );
      req.flush(mockMovieResponse);
      expect(moviesResponse).toEqual(mockMovieResponse);
    });
  });

  describe('getMovie', () => {
    it('should return a movie', () => {
      const id: number = 12345;
      let movieResponse: MovieDetails | undefined;
      const exampleMovieDetails: MovieDetails = {
        adult: false,
        backdrop_path: '/path/to/backdrop.jpg',
        belongs_to_collection: 'Example Collection',
        budget: 100000000,
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ],
        homepage: 'https://www.example.com',
        id: 12345,
        imdb_id: 'tt1234567',
        original_language: 'en',
        original_title: 'Example Movie',
        overview: 'This is an example overview of the movie.',
        popularity: 8.5,
        poster_path: '/path/to/poster.jpg',
        production_companies: [
          {
            id: 1,
            logo_path: '/path/to/logo.jpg',
            name: 'Example Productions',
            origin_country: 'US',
          },
        ],
        production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
        release_date: '2025-03-10',
        revenue: 500000000,
        runtime: 120,
        spoken_languages: [
          { english_name: 'English', iso_639_1: 'en', name: 'English' },
        ],
        status: 'Released',
        tagline: 'An example tagline.',
        title: 'Example Movie',
        video: false,
        vote_average: 7.8,
        vote_count: 1500,
      };

      moviesService.getMovie(id).subscribe((response) => {
        movieResponse = response;
      });

      const req = httpTestingController.expectOne(
        `${baseUrlMovie}${id}?language=es-ES`
      );
      req.flush(exampleMovieDetails);
      expect(movieResponse).toEqual(exampleMovieDetails);
    });
  });
});
