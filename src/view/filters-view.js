import AbstractView from '../framework/view/abstract-view.js';
import { generateFilters } from '../utils/filters.js';


const createFilterItemTemplate = (filter, isActive) => {
  const {filterTitle, filterlink, count} = filter;
  const isCount = filterTitle !== 'All movies' ? `<span class="main-navigation__item-count">${count}</span>` : '';
  return (`
  <a href="#${filterlink}" class="main-navigation__item ${ isActive ? 'main-navigation__item--active' : ''}">${filterTitle} ${isCount}</a>`);
};

const createFiltersTemplate = (films) => {
  const filters = generateFilters(films);
  return filters.map((filter, i) => createFilterItemTemplate(filter, i === 0)).join('\n');
};

const createNavigationTemplate = (films) =>`<nav class="main-navigation">
${createFiltersTemplate(films)}
</nav>`;

export default class FiltersView extends AbstractView {
  constructor({films}) {
    super();
    this.films = films;
  }

  get template() {
    return createNavigationTemplate(this.films);
  }
}
