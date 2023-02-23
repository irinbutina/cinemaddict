import { render } from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';

export default class FooterPresenter {
  #container = null;
  #filmsModel = null;

  constructor ({container, filmsModel }) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#renderFooterStatistics();
  }

  #renderFooterStatistics() {
    render (new FooterStatisticsView({countFilms: this.#filmsModel.films.length}), this.#container);
  }
}
