import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ShowsService } from '../shows.service';
import { provideHttpClient } from '@angular/common/http';
import { ShowsResponse } from '../../../core/models/modelsTest/showsResponse';
import { ShowDetail } from '../../../core/models/modelsTest/showDetails';

describe('ShowsService', () => {
  let showsService: ShowsService;
  let httpTestingController: HttpTestingController;
  const baseUrlTrending = 'https://api.themoviedb.org/3/trending/tv/';
  const baseUrlShow = 'https://api.themoviedb.org/3/tv/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    showsService = TestBed.inject(ShowsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(showsService).toBeTruthy();
  });

  it('should fetch trending shows', () => {
    let showsResponse: ShowsResponse[] | undefined;
    const trending = 'week';
    const page = 1;
    const mockShowResponse: ShowsResponse[] | undefined = [
      {
        page: 1,
        results: [
          {
            adult: false,
            backdrop_path: '/path/to/backdrop.jpg',
            id: 12345,
            name: 'Example Show',
            original_language: 'en',
            original_name: 'Example Original Show',
            overview: 'This is an example overview of the show.',
            poster_path: '/path/to/poster.jpg',
            media_type: 'tv',
            genre_ids: [1, 2, 3],
            popularity: 8.5,
            first_air_date: '2025-03-10',
            vote_average: 7.8,
            vote_count: 1500,
            origin_country: ['US'],
          },
        ],
        total_pages: 10,
        total_results: 100,
      },
    ];

    showsService.getTrendingShows(trending, page).subscribe((response) => {
      showsResponse = response;
    });

    const req = httpTestingController.expectOne(
      `${baseUrlTrending}${trending}?language=es-ES&page=${page}`
    );
    req.flush(mockShowResponse);
    expect(showsResponse).toEqual(mockShowResponse);
  });

    describe('getShow', () => {
      it('should return a show', () => {
        const id: number = 12345;
        let showResponse: ShowDetail | undefined;
        const exampleMovieDetails: ShowDetail = {
          adult: false,
          backdrop_path: '/path/to/backdrop.jpg',
          created_by: [
            {
              id: 1,
              credit_id: '123abc',
              name: 'John Doe',
              gender: 2,
              profile_path: '/path/to/profile.jpg'
            }
          ],
          episode_run_time: [45],
          first_air_date: '2025-03-10',
          genres: [
            {
              id: 1,
              name: 'Drama'
            },
            {
              id: 2,
              name: 'Thriller'
            }
          ],
          homepage: 'https://www.example.com',
          id: 12345,
          in_production: true,
          languages: ['en', 'es'],
          last_air_date: '2025-03-17',
          last_episode_to_air: {
            id: 1,
            name: 'Pilot',
            overview: 'This is the first episode.',
            vote_average: 8.5,
            vote_count: 1500,
            air_date: '2025-03-10',
            episode_number: 1,
            production_code: 'EP001',
            runtime: 45,
            season_number: 1,
            show_id: 12345,
            still_path: '/path/to/still.jpg'
          },
          next_episode_to_air: '2025-03-24',
          networks: [
            {
              id: 1,
              logo_path: '/path/to/logo.jpg',
              name: 'Example Network',
              origin_country: 'US'
            }
          ],
          number_of_episodes: 10,
          number_of_seasons: 1,
          origin_country: ['US'],
          original_language: 'en',
          original_name: 'Example Original Show',
          overview: 'This is an example overview of the show.',
          popularity: 8.5,
          poster_path: '/path/to/poster.jpg',
          production_companies: [
            {
              id: 1,
              logo_path: '/path/to/logo.jpg',
              name: 'Example Productions',
              origin_country: 'US'
            }
          ],
          production_countries: [
            {
              iso_3166_1: 'US',
              name: 'United States'
            }
          ],
          seasons: [
            {
              air_date: '2025-03-10',
              episode_count: 10,
              id: 1,
              name: 'Season 1',
              overview: 'This is the first season.',
              poster_path: '/path/to/season_poster.jpg',
              season_number: 1,
              vote_average: 8.5
            }
          ],
          spoken_languages: [
            {
              english_name: 'English',
              iso_639_1: 'en',
              name: 'English'
            }
          ],
          status: 'Running',
          tagline: 'An example tagline.',
          type: 'Scripted',
          vote_average: 8.5,
          vote_count: 1500
        };

        showsService.getShow(id).subscribe((response) => {
          showResponse = response;
        });

        const req = httpTestingController.expectOne(
          `${baseUrlShow}${id}?language=es-ES`
        );
        req.flush(exampleMovieDetails);
        expect(showResponse).toEqual(exampleMovieDetails);
      });
    });
});
