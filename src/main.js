import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainer = siteFooterElement.querySelector('.footer__statistics');

const filmsPresenter = new FilmsPresenter({filmsContainer: siteMainElement});

render (new ProfileView(), siteHeaderElement);
render (new NavigationView(), siteMainElement);
render (new SortView(), siteMainElement);

filmsPresenter.init();

render (new FooterStatisticsView, footerStatisticsContainer);
