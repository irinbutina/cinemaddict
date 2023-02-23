import AbstractView from '../framework/view/abstract-view.js';
import { LIST_EMPTY_TEXT } from '../const.js';

const createListEmptyTemplate = (filterType) => {
  const listEmptyText = LIST_EMPTY_TEXT[filterType];
  return `
  <section class="films-list">
  <h2 class="films-list__title">${listEmptyText}</h2>
  </section>`;
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}

