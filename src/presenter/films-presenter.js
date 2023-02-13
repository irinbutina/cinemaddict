import { render } from '../framework/render';
import FilmsContentView from '../view/films-content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class FilmsPresenter {
  filmsContentComponent = new FilmsContentView();
  filmsListComponent = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();
  showMoreButtonComponent = new ShowMoreButtonView();


  constructor({filmsContainer}) {
    this.filmsContainer = filmsContainer;
  }

  init() {
    render (this.filmsContentComponent, this.filmsContainer);
    render (this.filmsListComponent, this.filmsContentComponent.element);
    render (this.filmsListContainer, this.filmsListComponent.element);

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainer.element);
    }

    render (this.showMoreButtonComponent, this.filmsListComponent.element);
  }
}

