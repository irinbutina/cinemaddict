import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FooterPresenter from './presenter/footer-presenter.js';
import FilmsApiService from './films-api-service.js';
import CommentsApiService from './comments-api-service.js';


const AUTHORIZATION = 'Basic hd;as3fehf;sehath';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainer = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)
});
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
filmsModel.init();

footerPresenter.init();
