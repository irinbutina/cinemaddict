import Observable from '../framework/observable.js';

import { commentsList } from '../mock.js/comment.js';


export default class CommentsModel extends Observable {
  #comments = commentsList;

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    console.log(update)
    // console.log(this.#comments)
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    update.film.commentsID = update.film.commentsID.filter((id) => id !== update.id);
    console.log(this.#comments);
    console.log( update.film.commentsID);
    this._notify(updateType, update.film);
  }
}
