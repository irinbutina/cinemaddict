import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmsContainerView from './view/films-content-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import ProfileView from './view/profile-view.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render (new ProfileView(), siteHeaderElement);
render (new NavigationView(), siteMainElement);
render (new SortView(), siteMainElement);
render (new FilmsContainerView(), siteMainElement);

render (new ShowMoreButtonView(), siteMainElement);


