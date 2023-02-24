import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FooterPresenter from './presenter/footer-presenter.js';
import { generateFilter } from './mock.js/filter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainer = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();

const filters = generateFilter(filmsModel.films);

const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  filmsModel
});

const headerPresenter = new HeaderPresenter({
  container: siteHeaderElement,
  filmsModel
});

const footerPresenter = new FooterPresenter ({
  container: footerStatisticsContainer,
  filmsModel
});

headerPresenter.init();

render (new FiltersView({filters}), siteMainElement);
render (new SortView(), siteMainElement);

filmsPresenter.init();

footerPresenter.init();
