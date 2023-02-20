import { render } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';

export default class HeaderPresenter {
  constructor ({container, filmsModel }) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.renderProfileRating();
  }

  renderProfileRating() {
    render (new ProfileView({rating: this.getCountWatchedFilms()}), this.container);
  }

  getCountWatchedFilms() {
    return this.filmsModel.films.filter((film) => film.userDetails.alreadyWatched).length;
  }
}
