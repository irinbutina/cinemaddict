import { render } from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';

export default class FooterPresenter {
  constructor ({container, filmsModel }) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.renderFooterStatistics();
  }

  renderFooterStatistics() {
    render (new FooterStatisticsView({countfilms: this.filmsModel.films.length}), this.container);
  }
}