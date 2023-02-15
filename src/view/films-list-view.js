import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = (extra, title) =>`<section class="films-list ${extra ? 'films-list--extra' : ''}">
<h2 class="films-list__title ${extra ? '' : 'visually-hidden'}">${title}</h2>
</section>`;

export default class FilmsListView extends AbstractView {
  constructor({extra, title}) {
    super();
    this.extra = extra;
    this.title = title;
  }

  get template() {
    return createFilmsListTemplate(this.extra, this.title);
  }

}
