import Observable from '../framework/observable.js';

import { commentsList } from '../mock.js/comment.js';


export default class CommentsModel extends Observable {
  #comments = commentsList;

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments = [
      update.newComment,
      ...this.#comments,
    ];
    update.film.commentsID = [...update.film.commentsID, update.newComment.id];
    this._notify(updateType, update.film);
  }

  deleteComment(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    update.film.commentsID = update.film.commentsID.filter((id) => id !== update.id);
    this._notify(updateType, update.film);
  }
}
