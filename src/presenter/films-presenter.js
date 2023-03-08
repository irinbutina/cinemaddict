import { remove, render } from '../framework/render';
import FilmsContentView from '../view/films-content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import { CardCount, FilterType, SortTypeExtra, FILM_COUNT_PER_STEP, FilmsListTitle, SortType, UserAction, UpdateType } from '../const';
import { sortFilmsByCommented, sortFilmsByDate, sortFilmsByRated } from '../utils/utils';
import ListEmptyView from '../view/list-empty-view';
import FilmPresenter from './film-presenter';
import SortView from '../view/sort-view';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreButtonComponent = null;
  #commentsAll = [];
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;

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


  constructor({ filmsContainer, filmsModel, commentsModel }) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.SORT_BY_DATE:
        return [...this.#filmsModel.films].sort(sortFilmsByDate);
      case SortType.SORT_BY_RATING:
        return [...this.#filmsModel.films].sort(sortFilmsByRated);
    }
    return this.#filmsModel.films;
  }

  // #getfilmsExtra(sortTypeExtra) {
  //   if (sortTypeExtra === SortTypeExtra.MOST_COMMENTED) {
  //     return this.#filmsModel.films.sort(sortFilmsByCommented).slice(0, CardCount.EXTRA);
  //   }
  //   if (sortTypeExtra === SortTypeExtra.TOP_RATED) {
  //     return this.#filmsModel.films.sort(sortFilmsByRated).slice(0, CardCount.EXTRA);
  //   }
  // }

  get comments() {
    return this.#commentsModel;
  }

  init() {
    this.#commentsAll = [...this.#commentsModel.comments];
    this.#renderFilmsContent();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #handleModeChange = () => {
    this.#filmsPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  // #handleDataChange = (updatedFilm) => {
  //   this.#filmsPresenters.get(updatedFilm.id).init(updatedFilm);
  // };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm (updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType,update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        console.log('UpdateType.PATCH')
        this.#filmsPresenters.get(data.id).init(data);
        // this.#clearFilmsList();
        // this.#renderFilmsListAll();
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
          this.#clearFilmsList();
        this.#renderFilmsListAll();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };


  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render (this.#sortComponent, this.#filmsContainer);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleShowMoreButtonClick,
    });

    render(this.#showMoreButtonComponent, this.#filmsListAllComponent.element);
  }

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    console.log(this.films)
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);
    this.#renderFilms(films);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilm(film, container) {
    const filmPresenter = new FilmPresenter({
      containerList: container,
      commentsAll: this.#commentsAll,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    filmPresenter.init(film);
    this.#filmsPresenters.set(film.id, filmPresenter);
  }

  #renderFilms(films, container = this.#filmsListAllContainerComponent.element) {
    films.forEach((film) => this.#renderFilm(film, container));
  }

  #renderFilmsListAll() {
    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILM_COUNT_PER_STEP));

    render(this.#filmsListAllContainerComponent, this.#filmsListAllComponent.element);

    this.#renderFilms(films);

    if (filmsCount > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilmsListExtra(container) {
    const filmsListExtraContainerComponent = new FilmsListContainerView();
    render(filmsListExtraContainerComponent, container);
    // console.log(this.#filmsListCommentedComponent.element)
    // console.log(this.#getfilmsExtra(sortTypeExtra))
    // const films = this.#getfilmsExtra(sortTypeExtra);
    // this.#renderFilms(films, filmsListExtraContainerComponent.element);
    // for (let i = 0; i < CardCount.EXTRA; i++) {
    //   // this.#renderFilm(this.#sortFilms(sortTypeExtra)[i], filmsListExtraContainerComponent.element);
    // }
  }

  #renderFilmsList() {
    if (this.films.length === 0) {
      render(new ListEmptyView({filterType: FilterType.ALL}), this.#filmsContentComponent.element);
    } else {
      render(this.#filmsListAllComponent, this.#filmsContentComponent.element);
      this.#renderFilmsListAll();

      this.#renderFilmsListExtra(this.#filmsListExtraTopComponent.element, SortTypeExtra.TOP_RATED);
      render(this.#filmsListExtraTopComponent, this.#filmsContentComponent.element);

      this.#renderFilmsListExtra(this.#filmsListCommentedComponent.element, SortTypeExtra.MOST_COMMENTED);
      render(this.#filmsListCommentedComponent, this.#filmsContentComponent.element);
    }
  }

  #renderFilmsContent() {
    this.#renderSort();
    render(this.#filmsContentComponent, this.#filmsContainer);
    this.#renderFilmsList();
  }

  #clearFilmsList() {
    this.#filmsPresenters.forEach((presenter) => presenter.destroy());
    this.#filmsPresenters.clear();
    this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

}

