import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticsTemplate = (count) =>`
    <p>${count} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  #countFilms = null;

  constructor({countFilms}) {
    super();
    this.#countFilms = countFilms;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#countFilms);
  }

}
