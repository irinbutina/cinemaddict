import AbstractView from '../framework/view/abstract-view.js';
// import { generateFilters } from '../mock.js/filter.js';


const createFilterItemTemplate = (filter, isActive) => {
  const {filterTitle, filterlink, count} = filter;
  const isCount = filterTitle !== 'All movies' ? `<span class="main-navigation__item-count">${count}</span>` : '';
  return (`
  <a href="#${filterlink}" class="main-navigation__item ${ isActive ? 'main-navigation__item--active' : ''}">${filterTitle} ${isCount}</a>`);
};

const createFiltersTemplate = (filters) => filters.map((filter, i) => createFilterItemTemplate(filter, i === 0)).join('\n');

const createNavigationTemplate = (filters) =>`<nav class="main-navigation">
${createFiltersTemplate(filters)}
</nav>`;

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNavigationTemplate(this.#filters);
  }
}
