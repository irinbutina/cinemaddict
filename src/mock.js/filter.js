import { Filters } from '../const.js';

export const generateFilter = (films) => Filters.map((filter) => ({
  filterTitle: filter.title,
  filterlink: filter.link,
  count: filter.count(films)
}));
