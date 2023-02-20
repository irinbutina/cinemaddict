import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticsTemplate = (count) =>`
    <p>${count} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  constructor({countfilms}) {
    super();
    this.countfilms = countfilms;

  }

  get template() {
    return createFooterStatisticsTemplate(this.countfilms);
  }

}
