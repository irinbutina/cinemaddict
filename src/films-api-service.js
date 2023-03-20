import ApiService from './framework/api-service.js';
const Method = {
  GET: 'GET',
  POST: 'PUT',
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
      'comments': film.comments,
      'film_info': film.filmInfo,
    };
    return adaptedFilm;
  }
}


