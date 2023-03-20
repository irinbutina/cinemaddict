import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

import { commentsList } from '../mock.js/comment.js';


export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  async init (film) {
    try
    {
      const comments = await this.#commentsApiService.getComments(film.id);

      this.#comments = comments;

      console.log(this.#comments)
    } catch (err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INIT);
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
