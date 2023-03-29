import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor({ commentsApiService }) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  get comments() {
    // console.log(this.#comments)
    return this.#comments;
  }

  async init(filmId) {
    try {
      const comments = await this.#commentsApiService.getComments(filmId);
      this.#comments = comments.map(this.#adaptToClient);
    } catch (err) {
      this.#comments = [];
    }
  }

  addComment(updateType, update) {
    try {
      return this.#commentsApiService.addComment(update.film.id, update.newComment)
        .then((response) => {
          this.#comments = response.comments.map(this.#adaptToClient);
          this._notify(updateType, update.film);
        });
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  deleteComment(updateType, update) {
    try {
      return this.#commentsApiService.deleteComment(update.id)
        .then(() => {
          update.film.commentsID = update.film.commentsID.filter((id) => id !== update.id);
          this._notify(updateType, update.film);
        });
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(comment) {
    const adaptedComment = {
      ...comment,
      commentText: comment.comment,
      date: new Date(comment.date)

    };
    delete adaptedComment['comment'];

    return adaptedComment;
  }
}
