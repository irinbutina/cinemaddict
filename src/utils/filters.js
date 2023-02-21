import { Filters } from '../const.js';

const getCountFilters = (films, filterName) => {
  switch (filterName) {
    case 'Watchlist':
      return films.filter((film) => film.userDetails.watchlist).length;
    case 'History':
      return films.filter((film) => film.userDetails.alreadyWatched).length;
    case 'Favorites':
      return films.filter((film) => film.userDetails.favorite).length;

    default: return films.length;
  }
};

const generateFilters = (films) => Filters.map((filter) => ({
  filterTitle: filter.title,
  filterlink: filter.link,
  count: getCountFilters(films, filter.title)
}));

export {generateFilters};
