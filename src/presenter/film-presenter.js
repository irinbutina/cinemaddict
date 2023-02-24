import { render } from '../framework/render';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { isEscKey } from '../utils/utils';


export default class FilmPresenter {
  #containerList = null;
  #filmComponent = null;
  #filmPopupComponent = null;

  #film = null;
  #commentsAll = null;
  #bodyElement = document.querySelector('body');


  constructor({containerList}) {
    this.#containerList = containerList;
  }

  init(film, commentsAll) {
    this.#film = film;
    this.#commentsAll = commentsAll;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onCardLinkClick: this.#handleCardLinkClick
    });

    this.#filmPopupComponent = new FilmDetailsView({
      film: this.#film,
      comments: this.#commentsAll,
      onPopupCloseButtonClick: this.#handlePopupCloseButtonClick,
    });

    render(this.#filmComponent, this.#containerList);
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
  }

  #closePopup() {
    this.#bodyElement.classList.remove('hide-overflow');
    this.#bodyElement.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
      // document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

}

