import { generateCard } from '../mock.js/card.js';
import { commentsList } from '../mock.js/comment.js';

const FILMS_COUNT = 20;

export default class FilmsModel {
  films = Array.from({length: FILMS_COUNT}, generateCard);
  comments = commentsList;

  getFilms() {
    return this.films;
  }

  getComments() {
    return this.comments;
  }
}
