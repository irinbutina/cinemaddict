import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;

  constructor({ filmsApiService }) {
    super();
    this.#filmsApiService = filmsApiService;

  }

  get films() {
    return this.#films;
  }

  async init() {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);

      // console.log(this.#films)
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  #adaptToClient(film) {
    const adaptedFilm = {
      ...film,
      commentsID: film['comments'],
      filmInfo: {
        ...film['film_info'],
        ageRating: film['film_info']['age_rating'],
        alternativeTitle: film['film_info']['alternative_title'],
        rating: film['film_info']['total_rating'],
        release: {
          releaseDate: film['film_info'].release.date !== null ? new Date(film['film_info'].release.date) : film['film_info'].release.date,
          releaseCountry: film['film_info'].release['release_country'],
        }
      },
      userDetails: {
        ...film['user_details'],
        isWatchlist: film['user_details'].watchlist,
        watchingDate: film['user_details']['already_watched'],
        isHistory: film['user_details']['watching_date'],
        isFavorite: film['user_details'].favorite,
      }
    };

    delete adaptedFilm['comments'];
    delete adaptedFilm['film_info'];
    delete adaptedFilm['filmInfo']['total_rating'];
    delete adaptedFilm['filmInfo']['age_rating'];
    delete adaptedFilm['filmInfo']['alternative_title'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm['userDetails']['already_watched'];
    delete adaptedFilm['userDetails'].watchlist;
    delete adaptedFilm['userDetails']['watching_date'];
    delete adaptedFilm['userDetails'].favorite;

    return adaptedFilm;
  }
}
