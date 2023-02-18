import { generateCard } from '../mock.js/card.js';

const FILMS_COUNT = 20;

export default class FilmsModel {
  films = Array.from({length: FILMS_COUNT}, generateCard);

  getFilms() {
    return this.films;
  }
}
