import Observable from '../framework/observable.js';
import { generateCardWithId } from '../mock.js/card.js';

const FILMS_COUNT = 22;

export default class FilmsModel extends Observable {
  #films = Array.from({length: FILMS_COUNT}, generateCardWithId);

  get films() {
    // console.log(this.#films)
    return this.#films;
  }

}
