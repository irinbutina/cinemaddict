
import { commentsList } from '../mock.js/comment.js';
export default class CommentsModel {
  comments = commentsList;

  getComments() {
    return this.comments;
  }
}
