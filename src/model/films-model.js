import { generateCardWithId } from '../mock.js/card.js';
import { commentsList } from '../mock.js/comment.js';

const FILMS_COUNT = 2;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, generateCardWithId);
  #comments = commentsList;

  get films() {
    // console.log(this.#films)
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
