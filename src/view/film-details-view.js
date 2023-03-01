import AbstractView from '../framework/view/abstract-view.js';
import { humanizeCommentsDate, humanizeDuration, humanizeReleaseDate } from '../utils/card.js';
import { splitByWords } from '../utils/utils.js';
import { COMMENTS_EMOTION } from '../const.js';

const createGenreTemplate = (genres) => genres.map((genre) => `<span   class="film-details__genre">${genre}</span>`).join('\n');

const createCommentsTemplate = (commentsFilm) => commentsFilm.map((comment) => {
  const { author, commentText, date, emotion } = comment;
  const commentDate = humanizeCommentsDate(date);
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${commentText}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${commentDate}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
  );
}).join('\n');

const createCommentsListTemplate = (commentsFilm) => (` <ul class="film-details__comments-list">
  ${createCommentsTemplate(commentsFilm)}
  </ul>`);


const createEmojiTemplate = () =>
  COMMENTS_EMOTION.map((emotion) => `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`).join('\n');

const createEmojiListTemplate = () => (`<div class="film-details__emoji-list">
${createEmojiTemplate()}
</div>`);

const createFilmDetailsTemplate = (film, commentsFilm) => {
  const { filmInfo, userDetails } = film;
  // const commentsFilm = comments.filter((comment) => commentsID.includes(comment.id));
  const { title, alternativeTitle, rating, ageRating, release, duration, genre, poster, description, director, writers, actors, } = filmInfo;
  const { isWatchlist, isHistory, isFavorite } = userDetails;
  const { releaseDate, releaseCountry } = release;
  const writersByWorld = splitByWords(writers);
  const actorsByWorld = splitByWords(actors);
  const releaseFilmDate = humanizeReleaseDate(releaseDate);
  const durationFormat = humanizeDuration(duration);
  const genresCount = genre.length === 1 ? 'Genre' : 'Genres';
  const isActive = (userActive) => userActive ? 'film-details__control-button--active' : '';
  const commentCount = commentsFilm.length === 1 ? 'Comment' : 'Comments';

  return `<section class="film-details">
<div class="film-details__inner">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./${poster}" alt="">

        <p class="film-details__age">${ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writersByWorld}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actorsByWorld}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${releaseFilmDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Duration</td>
            <td class="film-details__cell">${durationFormat}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${genresCount}</td>
            <td class="film-details__cell">
            ${createGenreTemplate(genre)}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isActive(isWatchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${isActive(isHistory)}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${isActive(isFavorite)}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">${commentCount} <span class="film-details__comments-count">${commentsFilm.length}</span></h3>

      ${createCommentsListTemplate(commentsFilm)}

      <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        ${createEmojiListTemplate()}
      </form>
    </section>
  </div>
</div>
</section>`;
};

export default class FilmDetailsView extends AbstractView {
  #film = null;
  #commentsFilm = null;
  #handlePopupCloseButton = null;
  #handleWatchlistClick = null;
  #handleHistoryClick = null;
  #handleFavoriteClick = null;

  constructor({ film, commentsFilm, onPopupCloseButtonClick, onWatchlistClick, onHistoryClick, onFavoriteClick}) {
    super();
    this.#film = film;
    this.#commentsFilm = commentsFilm;
    this.#handlePopupCloseButton = onPopupCloseButtonClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleHistoryClick = onHistoryClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this. #popupCloseButtonClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#cardWatchlistHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#cardHistoryHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#cardFavoriteHandler);
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#commentsFilm);
  }

  // get scrollPosition() {
  //   return this.element.scrollTop;
  // }

  #popupCloseButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlePopupCloseButton();
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
