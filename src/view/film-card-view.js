import AbstractView from '../framework/view/abstract-view.js';
import { descriptionTextShort, getFormatDate, humanizeDuration } from '../utils/card.js';

const createFilmCardTemplate = (film, commentsFilm) => {
  const {filmInfo, userDetails} = film;
  const {title, rating, release, duration, genre, poster, description} = filmInfo;
  const {isWatchlist, isHistory, isFavorite} = userDetails;
  const {releaseDate} = release;
  const releaseDateFormat = getFormatDate(releaseDate, 'YYYY');
  const durationFormat = humanizeDuration(duration);
  const genreFirst = genre[0];
  const humanizeCommentslength = commentsFilm.length === 1 ? 'comment' : 'comments';
  const isActive = (userActive) => userActive ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDateFormat}</span>
      <span class="film-card__duration">${durationFormat}</span>
      <span class="film-card__genre">${genreFirst}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionTextShort(description)}</p>
    <span class="film-card__comments"> ${commentsFilm.length} ${humanizeCommentslength}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActive(isWatchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActive(isHistory)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isActive(isFavorite)}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;
  #commentsFilm = null;
  #handleCardLinkClick = null;
  #handleWatchlistClick = null;
  #handleHistoryClick = null;
  #handleFavoriteClick = null;

  constructor({film, commentsFilm, onCardLinkClick, onWatchlistClick, onHistoryClick, onFavoriteClick}) {
    super();
    this.#film = film;
    this.#commentsFilm = commentsFilm;
    this.#handleCardLinkClick = onCardLinkClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleHistoryClick = onHistoryClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#cardLinkClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#cardWatchlistHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#cardHistoryHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#cardFavoriteHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#film, this.#commentsFilm);
  }

  #cardLinkClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCardLinkClick();
  };

  #cardWatchlistHandler = (evt) => {
    // console.log('watchlist')
    evt.preventDefault();
    this.#handleWatchlistClick();
  };

  #cardHistoryHandler = (evt) => {
    // console.log('history')
    evt.preventDefault();
    this.#handleHistoryClick();
  };

  #cardFavoriteHandler = (evt) => {
    // console.log('favorit')
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

}
