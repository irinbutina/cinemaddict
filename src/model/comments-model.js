import Observable from '../framework/observable.js';

import { commentsList } from '../mock.js/comment.js';


export default class CommentsModel extends Observable {
  #comments = commentsList;

  get comments() {
    return this.#comments;
  }
}
