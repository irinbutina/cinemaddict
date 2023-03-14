import Observable from '../framework/observable.js';
import { generateCardWithId } from '../mock.js/card.js';

const FILMS_COUNT = 22;

export default class FilmsModel extends Observable {
  #films = Array.from({length: FILMS_COUNT}, generateCardWithId);


  get films() {
    return this.#films;
  }

  updateFilm (updateType, update) {
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


}
