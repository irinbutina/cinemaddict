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
    console.log(this.#comments)
    return this.#comments;
  }

  async init(filmId) {
    try {

      const comments = await this.#commentsApiService.getComments(filmId);
      this.#comments = comments.map(this.#adaptToClient);
      console.log(this.#comments)
    } catch (err) {
      // console.log('error')
      this.#comments = [];
    }
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

    try {
      console.log(this.#comments)
      return this.#commentsApiService.deleteComment(update.id).then(() => {
        update.film.commentsID = update.film.commentsID.filter((id) => id !== update.id);
        this._notify(updateType, update.film);
      })
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
    // const index = this.#comments.findIndex((comment) => comment.id === update.id);

    // if (index === -1) {
    //   throw new Error('Can\'t delete unexisting comment');
    // }

    // this.#comments = [
    //   ...this.#comments.slice(0, index),
    //   ...this.#comments.slice(index + 1),
    // ];


  }

  // async deleteComment(updateType, update) {
  //   console.log(updateType, update)
  //   console.log(this.#comments)
  //   const index = this.#comments.findIndex((comment) => comment.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t delete unexisting comment');
  //   }

  //   try {
  //     await this.#commentsApiService.deleteComment(update);

  //     this.#comments = [
  //       ...this.#comments.slice(0, index),
  //       ...this.#comments.slice(index + 1),
  //     ];
  //     this._notify(updateType);

  //   } catch (err) {
  //     throw new Error('Can\'t delete point');
  //   }


  //   update.film.commentsID = update.film.commentsID.filter((id) => id !== update.id);
  //   this._notify(updateType, update.film);
  // }

  #adaptToClient(comment) {
    const adaptedComment = {
      ...comment,
      commentText: comment['comment'],
      date:  comment['date'] !== null ? new Date(comment['date']) : comment['date'],
    };
    delete adaptedComment['comment'];

    return adaptedComment;
  }
}
