import { moviesReducer, initialMovieState } from '../movies.reducer';
import { ChangePage, ChangeTrending, LoadMovieDetail, LoadMovies } from '../movies.actions';

describe('MoviesReducer', () => {
  it('returns a default state', () => {
    const action = { type: 'Unknown' };
    const state = moviesReducer(initialMovieState, action);
    const newState = {
      movies: null,
      movieDetail: null,
      error: null,
      loading: false,
      page: 1,
      trending: 'week',
    };
    expect(state).toEqual(newState);
  });

  describe('getMovies', () => {
    it('getMoviesLoad', () => {
      const action = LoadMovies.load();
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getMoviesSuccess', () => {
      const action = LoadMovies.success({
        data: [
          {
            id: 1,
            releaseDate: '2025-03-11',
            voteAverage: 8.5,
            title: 'The Great Adventure',
            synopsis: 'A thrilling journey through uncharted territories.',
            image: 'https://example.com/image.jpg',
          },
        ],
      });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: [
          {
            id: 1,
            releaseDate: '2025-03-11',
            voteAverage: 8.5,
            title: 'The Great Adventure',
            synopsis: 'A thrilling journey through uncharted territories.',
            image: 'https://example.com/image.jpg',
          },
        ],
        movieDetail: null,
        error: null,
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getMoviesError', () => {
      const action = LoadMovies.error({
        error: new Error('Failed to load movies'),
      });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: new Error('Failed to load movies'),
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });
  });

  describe('getMovieDetail', () => {
    it('getMovieDetailLoad', () => {
      const action = LoadMovieDetail.load({ id: 1 });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getMovieDetailSuccess', () => {
      const action = LoadMovieDetail.success({
        data: {
          id: 1,
          releaseDate: '2025-03-11',
          voteAverage: 8.5,
          title: 'The Great Adventure',
          synopsis: 'A thrilling journey through uncharted territories.',
          image: 'https://example.com/image.jpg',
        },
      });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: {
          id: 1,
          releaseDate: '2025-03-11',
          voteAverage: 8.5,
          title: 'The Great Adventure',
          synopsis: 'A thrilling journey through uncharted territories.',
          image: 'https://example.com/image.jpg',
        },
        error: null,
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getMovieDetailError', () => {
      const action = LoadMovieDetail.error({
        error: new Error('Failed to load movies'),
      });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: new Error('Failed to load movies'),
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });
  });

  describe('getChangePage', () => {
    it('getChangePageLoad', () => {
      const action = ChangePage.load({ contador: 1 });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getChangePageSuccess', () => {
      const action = ChangePage.success({ contador: 1 });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: null,
        loading: false,
        page: 2,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getChangePageError', () => {
      const action = ChangePage.error({
        error: new Error('Failed to change page'),
      });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: new Error('Failed to change page'),
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });
  })

  describe('getChangeTrending', () => {
    it('getChangeTrendingLoad', () => {
      const action = ChangeTrending.load({ trendingWord: 'day' });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getChangeTrendingSuccess', () => {
      const action = ChangeTrending.success({ trendingWord: 'day' });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: null,
        loading: false,
        page: 1,
        trending: 'day',
      };
      expect(state).toEqual(newState);
    });

    it('getChangeTrendingError', () => {
      const action = ChangeTrending.error({
        error: new Error('Failed to change trending'),
      });
      const state = moviesReducer(initialMovieState, action);
      const newState = {
        movies: null,
        movieDetail: null,
        error: new Error('Failed to change trending'),
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });
  })
});
