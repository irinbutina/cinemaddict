import AbstractView from '../framework/view/abstract-view.js';
import { descriptionTextShort, getFormatDate, humanizeDuration } from '../utils/card.js';

const createFilmCardTemplate = (film) => {
  const {commentsID, filmInfo, userDetails} = film;
  const {title, rating, release, duration, genre, poster, description} = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const {releaseDate} = release;
  const releaseDateFormat = getFormatDate(releaseDate, 'YYYY');
  const durationFormat = humanizeDuration(duration);
  const genreFirst = genre[0];
  const humanizeCommentslength = commentsID.length === 1 ? 'comment' : 'comments';
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
    <span class="film-card__comments"> ${commentsID.length} ${humanizeCommentslength}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActive(watchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActive(alreadyWatched)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isActive(favorite)}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleCardLinkClick = null;

  constructor({film, onCardLinkClick}) {
    super();
    this.#film = film;
    this.#handleCardLinkClick = onCardLinkClick;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#cardLinkClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #cardLinkClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCardLinkClick();
  };

}
