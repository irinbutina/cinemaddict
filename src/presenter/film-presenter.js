import { render, remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { getCommentsFilm, isEscKey } from '../utils/utils';


const bodyElement = document.querySelector('body');
const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #containerList = null;
  #filmComponent = null;
  #filmPopupComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #film = null;
  #commentsAll = null;
  #commentsFilm = null;
  #mode = Mode.DEFAULT;


  constructor({containerList, commentsAll, onDataChange, onModeChange}) {
    this.#containerList = containerList;
    this.#commentsAll = commentsAll;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

  }

  init(film) {
    this.#film = film;
    this.#commentsFilm = getCommentsFilm(this.#commentsAll, this.#film.commentsID);

    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      commentsFilm: this.#commentsFilm,
      onCardLinkClick: this.#handleCardLinkClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onHistoryClick: this.#handleHistoryClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#filmPopupComponent = new FilmDetailsView({
      film: this.#film,
      commentsFilm: this.#commentsFilm,
      onPopupCloseButtonClick: this.#handlePopupCloseButtonClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onHistoryClick: this.#handleHistoryClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevFilmComponent === null ) {
      render(this.#filmComponent, this.#containerList);
    } else {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  }

  #handleCardLinkClick = () => {
    if (bodyElement.contains(this.#filmPopupComponent.element)) {
      return;
    }
    this.#openPopup();
  };

  #handlePopupCloseButtonClick = () => {
    this.#closePopup();
  };


  #handleWatchlistClick = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        isWatchlist : !this.#film.userDetails.isWatchlist
      }
    });
  };

  #handleHistoryClick = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        isHistory: !this.#film.userDetails.isHistory
      }
    });
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        isFavorite: !this.#film.userDetails.isFavorite
      }
    });
  };

  #openPopup() {
    bodyElement.appendChild(this.#filmPopupComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
    bodyElement.classList.add('hide-overflow');
  }

  #closePopup() {
    bodyElement.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
    bodyElement.classList.remove('hide-overflow');

  }

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

}

