import { render } from '../framework/render';
import FilmsContentView from '../view/films-content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view.js';
// import FilmDetailsView from '../view/film-details-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import { CardCount } from '../const';

const FilmsListTitle = {
  ALL: 'All movies. Upcoming',
  TOP: 'Top rated',
  COMMENTED:'Most commented'
};

export default class FilmsPresenter {
  filmsContentComponent = new FilmsContentView();
  filmsListAllComponent = new FilmsListView({
    extra: false,
    title: FilmsListTitle.ALL
  });

  filmsListExtraTopComponent = new FilmsListView({
    extra: true,
    title: FilmsListTitle.TOP
  });

  filmsListCommentedComponent = new FilmsListView({
    extra: 'films-list--extra',
    title: FilmsListTitle.COMMENTED
  });

  showMoreButtonComponent = new ShowMoreButtonView();

  constructor({filmsContainer}) {
    this.filmsContainer = filmsContainer;
  }

  init() {
    render (this.filmsContentComponent, this.filmsContainer);
    this.renderFilmsList();
  }

  renderFilmsListAll() {
    const filmsListAllContainerComponent = new FilmsListContainerView();
    render (filmsListAllContainerComponent, this.filmsListAllComponent.element);

    for (let i = 0; i < CardCount.ALL; i++) {
      render(new FilmCardView(), filmsListAllContainerComponent.element);
    }
    render (this.showMoreButtonComponent, this.filmsListAllComponent.element);
  }

  renderFilmsListExtra(container) {
    const filmsListExtraContainerComponent = new FilmsListContainerView();
    render (filmsListExtraContainerComponent, container);
    for (let i = 0; i < CardCount.EXTRA; i++) {
      render(new FilmCardView(), filmsListExtraContainerComponent.element);
    }
  }

  renderFilmsList() {
    render (this.filmsListAllComponent, this.filmsContentComponent.element);
    this.renderFilmsListAll();

    this.renderFilmsListExtra(this.filmsListExtraTopComponent.element);
    render (this.filmsListExtraTopComponent, this.filmsContentComponent.element);

    this.renderFilmsListExtra(this.filmsListCommentedComponent.element);
    render (this.filmsListCommentedComponent, this.filmsContentComponent.element);
  }
}
