import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeCommentsDate, humanizeDuration, humanizeReleaseDate } from '../utils/card.js';
import { splitByWords } from '../utils/utils.js';
import { COMMENTS_EMOTION } from '../const.js';
import { nanoid } from 'nanoid';
import he from 'he';

const createGenreTemplate = (genres) => genres.map((genre) => `<span   class="film-details__genre">${genre}</span>`).join('\n');

const createCommentsTemplate = (commentsFilm) => commentsFilm.map((comment) => {
  const { author, commentText, date, emotion, id } = comment;
  const commentDate = humanizeCommentsDate(date);
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(commentText)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${commentDate}</span>
            <button class="film-details__comment-delete" data-comment-id="${id}" >Delete</button>
          </p>
        </div>
      </li>`
  );
}).join('\n');

const createCommentsListTemplate = (commentsFilm) => (` <ul class="film-details__comments-list">
  ${createCommentsTemplate(commentsFilm)}
  </ul>`);


const createEmojiTemplate = (currentSmile) =>
  COMMENTS_EMOTION.map((emotion) => `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${currentSmile === emotion ? 'checked' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`).join('\n');

const createEmojiListTemplate = (currentSmile) => (`<div class="film-details__emoji-list">
${createEmojiTemplate(currentSmile)}
</div>`);

const createNewCommentTemplate = (newComment) => {
  const { emotion, commentText } = newComment;
  const isEmoji = emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : '';
  const isCommentText = commentText ? commentText : '';
  return `
  <form class="film-details__new-comment" action="" method="get">
  <div class="film-details__add-emoji-label">${isEmoji}</div>
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${isCommentText}</textarea>
  </label>
  ${createEmojiListTemplate(emotion)}
</form>`;
};

const createFilmDetailsTemplate = (film, commentsFilm) => {
  const { filmInfo, userDetails, newComment } = film;
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
      ${createNewCommentTemplate(newComment)}
    </section>
  </div>
</div>
</section>`;
};


export default class FilmDetailsView extends AbstractStatefulView {

  #film = null;
  #commentsFilm = null;
  #handlePopupCloseButton = null;
  #handleWatchlistClick = null;
  #handleHistoryClick = null;
  #handleFavoriteClick = null;
  #handleCommentAdd = null;
  #handleCommentDelete = null;

  constructor({ film, commentsFilm, onPopupCloseButtonClick, onWatchlistClick, onHistoryClick, onFavoriteClick, onCommentAdd, onCommentDelete }) {
    super();
    this._setState(FilmDetailsView.parseCardToState(film));
    this.#film = film;
    this.#commentsFilm = commentsFilm;

    this.#handlePopupCloseButton = onPopupCloseButtonClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleHistoryClick = onHistoryClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleCommentAdd = onCommentAdd;
    this.#handleCommentDelete = onCommentDelete;

    this._restoreHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state, this.#commentsFilm);
  }

  get scrollPosition() {
    return this.element.scrollTop;
  }

  scrollPopup(scrollPosition) {
    this.element.scrollTo(0, scrollPosition);
  }


  updateElement(update) {
    const currentPosition = this.scrollPosition;
    super.updateElement(update);
    this.scrollPopup(currentPosition);
  }

  reset(film) {
    this.updateElement(
      FilmDetailsView.parseCardToState(film),
    );
  }

  _restoreHandlers() {
    this.#setInnerHandlers();
  }

  #setInnerHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseButtonClickHandler);

    const commentInputElement = this.element.querySelector('.film-details__comment-input');

    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#cardWatchlistHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#cardHistoryHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#cardFavoriteHandler);

    if (this.#commentsFilm.length > 0) {
      this.element.querySelectorAll('.film-details__comment-delete').forEach((btn) => btn.addEventListener('click', this.#deleteCommentHandler));
    }

    commentInputElement.addEventListener('keydown', this.#addCommentHandler);

    commentInputElement.addEventListener('input', this.#inputTextCommentHandler);

    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#changeEmojiHandler);
  }

  #changeEmojiHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      ...this._state,
      newComment: {
        ...this._state.newComment,
        emotion: evt.target.value,
      }
    });
  };

  #inputTextCommentHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      ...this._state,
      newComment: {
        ...this._state.newComment,
        commentText: evt.target.value,
      }
    });
  };

  #addCommentHandler = (evt) => {
    if (evt.ctrlKey && evt.keyCode === 13 || evt.commandKey && evt.keyCode === 13) {
      evt.preventDefault();
      this.#handleCommentAdd({
        film: this.#film,
        newComment: {
          ...this._state.newComment
        }
      });
    }
  };
  // #addCommentHandler = (evt) => {
  //   if (evt.ctrlKey && evt.keyCode === 13 || evt.commandKey && evt.keyCode === 13) {
  //     evt.preventDefault();
  //     this.#handleCommentAdd({
  //       film: this.#film,
  //       newComment: {
  //         id: nanoid(), ...this._state.newComment
  //       }
  //     });
  //   }
  // };

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.dataset.commentId)
    this.#handleCommentDelete({
      id: evt.target.dataset.commentId,
      film: this.#film,
    });
  };

  #popupCloseButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlePopupCloseButton();
  };

  #cardWatchlistHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick();
  };

  #cardHistoryHandler = (evt) => {
    evt.preventDefault();
    this.#handleHistoryClick();
  };

  #cardFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  static parseCardToState(film) {
    return {
      ...film,
      newComment: {
        ...film.newComment,
        commentText: '',
        emotion: '',
        // date: new Date()
      }
    };
  }

  static parseStateToCard(state) {
    const film = {
      ...state,
    };

    delete film.newComment;

    return film;
  }
}
