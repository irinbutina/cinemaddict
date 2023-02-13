import ShowMoreButtonView from './view/show-more-button.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render (new ShowMoreButtonView(), siteMainElement);


