import ApiService from './framework/api-service.js';
// const Method = {
//   GET: 'GET',
//   POST: 'PUT',
// };

export default class CommentsApiService extends ApiService {
  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then(ApiService.parseResponse);
  }
}
