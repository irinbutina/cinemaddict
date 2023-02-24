import { getFilterCountAll, getFilterCountFavorites, getFilterCountHistory, getFilterCountWatchlist } from './utils/filters.js';

const COMMENTS_EMOTION = ['smile', 'sleeping', 'puke', 'angry'];

const CardCount = {
  ALL: 5,
  EXTRA: 2,
};

const PROFILE_RATING = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};

const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};


const Filters = [
  {
    title: FilterType.ALL,
    link: 'all',
    count: (films) => getFilterCountAll(films),
  },
  {
    title: FilterType.WATCHLIST,
    link: 'watchlist',
    count: (films) => getFilterCountWatchlist(films),
  },
  {
    title: FilterType.HISTORY,
    link: 'history',
    count: (films) => getFilterCountHistory(films),
  },
  {
    title: FilterType.FAVORITES,
    link: 'favorites',
    count: (films) => getFilterCountFavorites(films)
  },
];

const LIST_EMPTY_TEXT = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};


const SortType = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};


export { COMMENTS_EMOTION, CardCount, PROFILE_RATING, FilterType, LIST_EMPTY_TEXT, SortType, Filters };

