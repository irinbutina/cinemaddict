import { render, replace, remove } from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';

export default class FooterPresenter {
  #container = null;
  #filmsModel = null;
  #footerComponent = null;

  constructor ({container, filmsModel }) {
    this.#container = container;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevFooterComponent = this.#footerComponent;
    const countFilms = this.#filmsModel.films.length;

    this.#footerComponent = new FooterStatisticsView({countFilms});

    if (prevFooterComponent === null) {
      render(this.#footerComponent, this.#container);
      return;
    }
    replace(this.#footerComponent, prevFooterComponent);
    remove(prevFooterComponent);
  }

  destroy() {
    remove(this.#footerComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
