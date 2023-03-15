import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FooterPresenter from './presenter/footer-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainer = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  filmsModel,
  commentsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterModel,
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

// render (new SortView(), siteMainElement);
filterPresenter.init();
filmsPresenter.init();

footerPresenter.init();
