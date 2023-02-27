import { render, remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { isEscKey } from '../utils/utils';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #containerList = null;
  #filmComponent = null;
  #filmPopupComponent = null;
  #handleModeChange = null;

  #film = null;
  #commentsAll = null;
  #mode = Mode.DEFAULT;

  #bodyElement = document.querySelector('body');


  constructor({containerList, onModeChange}) {
    this.#containerList = containerList;
    this.#handleModeChange = onModeChange;

  }

  init(film, commentsAll) {
    this.#film = film;
    this.#commentsAll = commentsAll;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;


    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onCardLinkClick: this.#handleCardLinkClick
    });

    this.#filmPopupComponent = new FilmDetailsView({
      film: this.#film,
      comments: this.#commentsAll,
      onPopupCloseButtonClick: this.#handlePopupCloseButtonClick,
    });

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this.#filmComponent, this.#containerList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
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
    this.#openPopup();
  };

  #handlePopupCloseButtonClick = () => {
    this.#closePopup();
  };

  #openPopup() {
    this.#bodyElement.classList.add('hide-overflow');
    this.#bodyElement.appendChild(this.#filmPopupComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  }

  #closePopup() {
    this.#bodyElement.classList.remove('hide-overflow');
    this.#bodyElement.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
      // document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

}

