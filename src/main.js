import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './framework/render.js';
import HeaderPresenter from './presenter/header-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainer = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();

const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  filmsModel
});

const headerPresenter = new HeaderPresenter({
  container: siteHeaderElement,
  filmsModel
});
headerPresenter.init();
render (new NavigationView(), siteMainElement);
render (new SortView(), siteMainElement);

filmsPresenter.init();

render (new FooterStatisticsView, footerStatisticsContainer);
