import { render } from '../framework/render';
import FilmsContentView from '../view/films-content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import { CardCount, SortType } from '../const';
import { sortFilmsByCommented, sortFilmsByRated } from '../utils/utils';

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

  constructor({filmsContainer, filmsModel}) {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmsAll = [...this.filmsModel.films];
    this.commentsAll = [...this.filmsModel.comments];
    render (this.filmsContentComponent, this.filmsContainer);
    this.renderFilmsList();
    // this.renderFilmPopup();
  }

  sortFilms(sortType) {
    switch (sortType) {
      case SortType.MOST_COMMENTED:
        return this.filmsAll.slice().sort(sortFilmsByCommented);
      case SortType.TOP_RATED:
        return this.filmsAll.slice().sort(sortFilmsByRated);
    }
  }

  renderFilmsListAll() {
    const filmsListAllContainerComponent = new FilmsListContainerView();
    render (filmsListAllContainerComponent, this.filmsListAllComponent.element);

    for (let i = 0; i < this.filmsAll.length; i++) {
      render(new FilmCardView({film: this.filmsAll[i]}), filmsListAllContainerComponent.element);
    }
    render (this.showMoreButtonComponent, this.filmsListAllComponent.element);
  }

  renderFilmsListExtra(container, sortType) {
    const filmsListExtraContainerComponent = new FilmsListContainerView();
    render (filmsListExtraContainerComponent, container);
    for (let i = 0; i < CardCount.EXTRA; i++) {
      render(new FilmCardView({film: this.sortFilms(sortType)[i]}), filmsListExtraContainerComponent.element);
    }
  }

  renderFilmsList() {
    render (this.filmsListAllComponent, this.filmsContentComponent.element);
    this.renderFilmsListAll();

    this.renderFilmsListExtra(this.filmsListExtraTopComponent.element, SortType.TOP_RATED);
    render (this.filmsListExtraTopComponent, this.filmsContentComponent.element);

    this.renderFilmsListExtra(this.filmsListCommentedComponent.element, SortType.MOST_COMMENTED);
    render (this.filmsListCommentedComponent, this.filmsContentComponent.element);
  }

  renderFilmPopup() {
    const bodyElement = document.querySelector('body');
    render(new FilmDetailsView({film: this.filmsAll[0], comments: this.commentsAll}), bodyElement);
  }
}

