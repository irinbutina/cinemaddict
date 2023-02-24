import { render } from '../framework/render';
import FilmsContentView from '../view/films-content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import { CardCount, FilterType, SortType } from '../const';
import { sortFilmsByCommented, sortFilmsByRated } from '../utils/utils';
import ListEmptyView from '../view/list-empty-view';
import FilmPresenter from './film-presenter';

const FilmsListTitle = {
  ALL: 'All movies. Upcoming',
  TOP: 'Top rated',
  COMMENTED: 'Most commented'
};

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #showMoreButtonComponent = null;
  #filmsAll = [];
  #commentsAll = [];

  #renderedFilmsCount = FILM_COUNT_PER_STEP;

  #filmsContentComponent = new FilmsContentView();
  #filmsListAllComponent = new FilmsListView({
    extra: false,
    title: FilmsListTitle.ALL
  });

  #filmsListExtraTopComponent = new FilmsListView({
    extra: true,
    title: FilmsListTitle.TOP
  });

  #filmsListCommentedComponent = new FilmsListView({
    extra: 'films-list--extra',
    title: FilmsListTitle.COMMENTED
  });

  #filmsListAllContainerComponent = new FilmsListContainerView();


  constructor({ filmsContainer, filmsModel }) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#filmsAll = [...this.#filmsModel.films];
    this.#commentsAll = [...this.#filmsModel.comments];
    this.#renderFilmsContent();
  }

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.MOST_COMMENTED:
        return this.#filmsAll.slice().sort(sortFilmsByCommented);
      case SortType.TOP_RATED:
        return this.#filmsAll.slice().sort(sortFilmsByRated);
    }
  }

  #renderFilm(film, container) {
    const filmPresenter = new FilmPresenter({containerList: container});
    filmPresenter.init(film, this.#commentsAll);
  }

  #renderFilmsListAll() {
    render(this.#filmsListAllContainerComponent, this.#filmsListAllComponent.element);

    for (let i = 0; i < Math.min(this.#filmsAll.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#filmsAll[i], this.#filmsListAllContainerComponent.element);
    }

    if (this.#filmsAll.length > FILM_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView();
      render(this.#showMoreButtonComponent, this.#filmsListAllComponent.element);

      this.#showMoreButtonComponent.element.addEventListener('click', this.#loadMoreButtonHandler);
    }
  }

  #loadMoreButtonHandler = () => {
    this.#filmsAll.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP).forEach((film) => this.#renderFilm(film, this.#filmsListAllContainerComponent.element));

    this.#renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsAll.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilmsListExtra(container, sortType) {
    const filmsListExtraContainerComponent = new FilmsListContainerView();
    render(filmsListExtraContainerComponent, container);
    for (let i = 0; i < CardCount.EXTRA; i++) {
      this.#renderFilm(this.#sortFilms(sortType)[i], filmsListExtraContainerComponent.element);
    }
  }

  #renderFilmsList() {
    if (this.#filmsAll.length === 0) {
      render(new ListEmptyView({filterType: FilterType.ALL}), this.#filmsContentComponent.element);
    } else {
      render(this.#filmsListAllComponent, this.#filmsContentComponent.element);
      this.#renderFilmsListAll();

      this.#renderFilmsListExtra(this.#filmsListExtraTopComponent.element, SortType.TOP_RATED);
      render(this.#filmsListExtraTopComponent, this.#filmsContentComponent.element);

      this.#renderFilmsListExtra(this.#filmsListCommentedComponent.element, SortType.MOST_COMMENTED);
      render(this.#filmsListCommentedComponent, this.#filmsContentComponent.element);
    }
  }

  #renderFilmsContent() {
    render(this.#filmsContentComponent, this.#filmsContainer);
    this.#renderFilmsList();
  }
}

