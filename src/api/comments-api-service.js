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


  async deleteComment(commentId) {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE
    });
    console.log(response)
    return response;
  }

}
