import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';


const sortButtonsArray = Object.entries(SortType);


const createSortItemTemplate = (sortType, currentSortType) => {
  const title = sortType[1];
  // console.log(title, currentSortType)
  const dataAttribute = `data-sort-type="${title}"`;
  const isActive = currentSortType === title ? 'sort__button--active' : '';
  return `
  <li><a href="#" class="sort__button ${isActive}" ${dataAttribute}>${title}</a></li>`;
};


const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = sortButtonsArray.map((item) => createSortItemTemplate(item, currentSortType)).join('\n');
  return `<ul class="sort">
  ${sortItemsTemplate}
  </ul>
  >`;
};


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {

    if(evt.target.tagName !== 'A') {
      return;
    }

    const activeButton = this.element.querySelector('.sort__button--active');
    activeButton.classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
