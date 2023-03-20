import { remove, render, replace } from '../framework/render.js';
import { getCountWatchedFilms } from '../utils/utils.js';
import ProfileView from '../view/profile-view.js';

export default class HeaderPresenter {
  #container = null;
  #filmsModel = null;
  #headerComponent = null;

  constructor ({container, filmsModel }) {
    this.#container = container;
    this.#filmsModel = filmsModel;


    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevHeaderComponent = this.#headerComponent;
    const userRang = getCountWatchedFilms(this.#filmsModel.films);

    this.#headerComponent = new ProfileView({rating: userRang});

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#container);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  destroy() {
    remove(this.#headerComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
