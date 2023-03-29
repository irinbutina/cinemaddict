import ApiService from '../framework/api-service.js';
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {

  async getComments(filmId) {
    return this._load({url: `comments/${filmId}`}).then(ApiService.parseResponse);
  }


  async addComment(filmId, comment) {
    console.log(comment)
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(comment)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }


  async deleteComment(commentId) {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE
    });
    console.log(response)
    return response;
  }


  #adaptToServer(comment) {
    const adaptedComment = {
      ...comment,
      'comment': comment.commentText,
      // 'date': comment.date instanceof Date ? comment.date.toISOString() : null,
    };

    delete adaptedComment['commentText'];

    return adaptedComment;
  }

}
