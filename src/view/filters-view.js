import AbstractView from '../framework/view/abstract-view.js';
// import { generateFilters } from '../mock.js/filter.js';


const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  const isCount = type !== 'All movies' ? `<span class="main-navigation__item-count">${count}</span>` : '';
  const dataAttribute = `data-filter-type="${type}"`;

  return (`
  <a href="#${name}" class="main-navigation__item ${ currentFilterType === type ? 'main-navigation__item--active' : ''}" ${dataAttribute}>${type} ${isCount}</a>`);
};

const createFiltersTemplate = (filters, currentFilterType) => filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('\n');

const createNavigationTemplate = (filters, currentFilterType) =>`<nav class="main-navigation">
${createFiltersTemplate(filters, currentFilterType)}
</nav>`;

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createNavigationTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
