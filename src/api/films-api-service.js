import ApiService from '../framework/api-service.js';
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  #adaptToServer(film) {
    const adaptedFilm = {
      ...film,
      'comments': film.commentsID,
      'film_info': {
        ...film.filmInfo,
        'age_rating': film.filmInfo.ageRating,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.rating,
        'release': {
          'date': film.filmInfo.release.releaseDate instanceof Date ? film.filmInfo.release.releaseDate.toISOString() : null,
          'release_country': film.filmInfo.release.releaseCountry,
        }
      },
      'user_details': {
        ...film.userDetails,
        'watching_date': film.userDetails.watchingDate instanceof Date ? film.userDetails.watchingDate.toISOString() : null,
        'already_watched': film.userDetails.isHistory,
        'watchlist': film.userDetails.isWatchlist,
        'favorite': film.userDetails.isFavorite,
      }
    };

    delete adaptedFilm['commentsID'];
    delete adaptedFilm['filmInfo'];
    delete adaptedFilm['film_info'].ageRating;
    delete adaptedFilm['film_info'].alternativeTitle;
    delete adaptedFilm['film_info'].rating;
    delete adaptedFilm['userDetails'];
    delete adaptedFilm['user_details'].watchingDate;
    delete adaptedFilm['user_details'].isHistory;
    delete adaptedFilm['user_details'].isWatchlist;
    delete adaptedFilm['user_details'].isFavorite;

    return adaptedFilm;
  }
}


