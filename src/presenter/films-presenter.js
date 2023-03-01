import { remove, render } from '../framework/render';
import FilmsContentView from '../view/films-content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import { CardCount, FilterType, SortType, FILM_COUNT_PER_STEP, FilmsListTitle } from '../const';
import { sortFilmsByCommented, sortFilmsByRated, updateItem } from '../utils/utils';
import ListEmptyView from '../view/list-empty-view';
import FilmPresenter from './film-presenter';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #showMoreButtonComponent = null;
  #filmsAll = [];
  #commentsAll = [];

  #renderedFilmsCount = FILM_COUNT_PER_STEP;
  #filmsPresenters = new Map();

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
    extra: true,
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

  #handleModeChange = () => {
    this.#filmsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmsAll = updateItem(this.#filmsAll, updatedFilm);
    this.#filmsPresenters.get(updatedFilm.id).init(updatedFilm);
  };


  #renderFilm(film, container) {
    const filmPresenter = new FilmPresenter({
      containerList: container,
      commentsAll: this.#commentsAll,
      onDataChange: this.#handleFilmChange,
      onModeChange: this.#handleModeChange,
    });

    filmPresenter.init(film);
    this.#filmsPresenters.set(film.id, filmPresenter);
  }

  #clearFilmsList() {
    this.#filmsPresenters.forEach((presenter) => presenter.destroy());
    this.#filmsPresenters.clear();
    this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
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
      // this.#renderFilm(this.#sortFilms(sortType)[i], filmsListExtraContainerComponent.element);
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

