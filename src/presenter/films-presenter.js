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
  #filmPresenter = null;

  #listEmptyComponent = new ListEmptyView({filterType: FilterType.ALL});

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

  get comments() {
    return this.#commentsModel.comments;
  }

  // #getfilmsExtra(sortTypeExtra) {
  //   if (sortTypeExtra === SortTypeExtra.MOST_COMMENTED) {
  //     return this.#filmsModel.films.sort(sortFilmsByCommented).slice(0, CardCount.EXTRA);
  //   }
  //   if (sortTypeExtra === SortTypeExtra.TOP_RATED) {
  //     return this.#filmsModel.films.sort(sortFilmsByRated).slice(0, CardCount.EXTRA);
  //   }
  // }

  init() {
    this.#renderFilmsBoard();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsBoard({resetRenderedFilmsCount: true});
    this.#renderFilmsBoard();
  };

  #handleModeChange = () => {
    this.#filmsPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #handleViewAction = (actionType, updateType, update) => {
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
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderFilmsBoard();
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
      commentsAll: this.comments,
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

    const films = this.films;
    const filmsCount = films.length;

    render(this.#filmsListAllContainerComponent, this.#filmsListAllComponent.element);

    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)));

    if (filmsCount > this.#renderedFilmsCount) {
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

  #renderEmptyComponent() {
    render(this.#listEmptyComponent, this.#filmsContentComponent.element);
  }

  #renderFilmsList() {
    const filmsCount = this.films.length;

    if (filmsCount === 0) {
      this.#renderEmptyComponent();
      return;
    }

    render(this.#filmsListAllComponent, this.#filmsContentComponent.element);

    this.#renderFilmsListAll();

    // this.#renderFilmsListExtra(this.#filmsListExtraTopComponent.element, SortTypeExtra.TOP_RATED);
    // render(this.#filmsListExtraTopComponent, this.#filmsContentComponent.element);

    // this.#renderFilmsListExtra(this.#filmsListCommentedComponent.element, SortTypeExtra.MOST_COMMENTED);
    // render(this.#filmsListCommentedComponent, this.#filmsContentComponent.element);
  }

  #renderFilmsBoard() {
    this.#renderSort();
    console.log('renderFilmsBoard')
    // console.log(this.#filmsContainer)
    render(this.#filmsContentComponent, this.#filmsContainer);
    this.#renderFilmsList();
  }

  #clearFilmsBoard({resetRenderedFilmsCount = false, resetSortType = false} = {}) {

    const filmsCount = this.films.length;
    console.log(filmsCount)

    this.#filmsPresenters.forEach((presenter) => presenter.destroy());
    this.#filmsPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmsCount) {
      console.log('renderedFilmsCount')
      this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      console.log('resetSortType')
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  // #clearFilmsList() {
  //   this.#filmsPresenters.forEach((presenter) => presenter.destroy());
  //   this.#filmsPresenters.clear();
  //   this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
  //   remove(this.#showMoreButtonComponent);
  // }

}

