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
  },
  {
    title: FilterType.WATCHLIST,
    link: 'watchlist',
  },
  {
    title: FilterType.HISTORY,
    link: 'history',
  },
  {
    title: FilterType.FAVORITES,
    link: 'favorites',
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


export { COMMENTS_EMOTION, CardCount, PROFILE_RATING, Filters, FilterType, LIST_EMPTY_TEXT, SortType };

