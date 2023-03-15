// import { getFilterCountAll, getFilterCountFavorites, getFilterCountHistory, getFilterCountWatchlist } from './utils/filters.js';

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

const LIST_EMPTY_TEXT = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};


const SortType = {
  DEFAULT: 'Sort by default',
  SORT_BY_DATE: 'Sort by date',
  SORT_BY_RATING: 'Sort by rating',
};

const SortTypeExtra = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};

const FILM_COUNT_PER_STEP = 5;

const FilmsListTitle = {
  ALL: 'All movies. Upcoming',
  TOP: 'Top rated',
  COMMENTED: 'Most commented'
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { COMMENTS_EMOTION, CardCount, PROFILE_RATING, FilterType, LIST_EMPTY_TEXT, SortType, SortTypeExtra, FILM_COUNT_PER_STEP, FilmsListTitle, UserAction, UpdateType };

