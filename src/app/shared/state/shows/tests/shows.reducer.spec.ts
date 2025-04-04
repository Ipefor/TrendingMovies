import { ChangePage, ChangeTrending, LoadShowDetail, LoadShows } from '../shows.actions';
import { showsReducer, initialShowState } from '../shows.reducer';

describe('ShowsReducer', () => {
  it('returns a default state', () => {
    const action = { type: 'Unknown' };
    const state = showsReducer(initialShowState, action);
    const newState = {
      shows: null,
      showDetail: null,
      error: null,
      loading: false,
      page: 1,
      trending: 'week',
    };
    expect(state).toEqual(newState);
  });

  describe('getShows', () => {
    it('getShowsLoad', () => {
      const action = LoadShows.load();
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getShowsSuccess', () => {
      const action = LoadShows.success({
        data: [
          {
            id: 1,
            releaseDate: '2025-03-11',
            voteAverage: 8.5,
            title: 'The Great Adventure',
            synopsis: 'A thrilling journey through uncharted territories.',
            image: 'https://example.com/image.jpg',
            originCountry: ['USA'],
            genres: ['Adventure', 'Action']
          },
        ],
      });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: [
          {
            id: 1,
            releaseDate: '2025-03-11',
            voteAverage: 8.5,
            title: 'The Great Adventure',
            synopsis: 'A thrilling journey through uncharted territories.',
            image: 'https://example.com/image.jpg',
            originCountry: ['USA'],
            genres: ['Adventure', 'Action']
          },
        ],
        showDetail: null,
        error: null,
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getShowsError', () => {
      const action = LoadShows.error({
        error: new Error('Failed to load shows'),
      });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: new Error('Failed to load shows'),
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });
  });

  describe('getShowDetail', () => {
    it('getShowDetailLoad', () => {
      const action = LoadShowDetail.load({ id: 1 });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getShowDetailSuccess', () => {
      const action = LoadShowDetail.success({
        data: {
            id: 1,
            releaseDate: '2025-03-11',
            voteAverage: 8.5,
            title: 'The Great Adventure',
            synopsis: 'A thrilling journey through uncharted territories.',
            image: 'https://example.com/image.jpg',
            originCountry: ['USA'],
            genres: ['Adventure', 'Action']
        },
      });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: {
          id: 1,
          releaseDate: '2025-03-11',
          voteAverage: 8.5,
          title: 'The Great Adventure',
          synopsis: 'A thrilling journey through uncharted territories.',
          image: 'https://example.com/image.jpg',
          originCountry: ['USA'],
          genres: ['Adventure', 'Action']
        },
        error: null,
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getShowDetailError', () => {
      const action = LoadShowDetail.error({
        error: new Error('Failed to load show'),
      });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: new Error('Failed to load show'),
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
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getChangePageSuccess', () => {
      const action = ChangePage.success({ contador: 1 });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
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
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
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
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: null,
        loading: true,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });

    it('getChangeTrendingSuccess', () => {
      const action = ChangeTrending.success({ trendingWord: 'day' });
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
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
      const state = showsReducer(initialShowState, action);
      const newState = {
        shows: null,
        showDetail: null,
        error: new Error('Failed to change trending'),
        loading: false,
        page: 1,
        trending: 'week',
      };
      expect(state).toEqual(newState);
    });
  })
});
