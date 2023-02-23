import { generateCard } from '../mock.js/card.js';
import { commentsList } from '../mock.js/comment.js';

const FILMS_COUNT = 0;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, generateCard);
  #comments = commentsList;

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
