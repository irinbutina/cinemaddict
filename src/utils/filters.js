export const getFilterCountAll = (films) => films.length;
export const getFilterCountWatchlist = (films) => films.filter((film) => film.userDetails.watchlist).length;
export const getFilterCountHistory = (films) => films.filter((film) => film.userDetails.alreadyWatched).length;
export const getFilterCountFavorites = (films) => films.filter((film) => film.userDetails.favorite).length;
