export const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const splitByWords = (words) => words.join(', ');

export const objToMap = (o) => new Map(Object.entries(o));

export const getProfileRating = (rating) => {
  switch (true) {
    case rating === 0:
      return '';
    case rating > 0 && rating <= 10:
      return 'novice';
    case rating > 10 && rating <= 20:
      return 'fan';
    case rating > 20:
      return 'movie buff';
  }
};

export const sortFilmsByCommented = (a, b) => b.commentsID.length - a.commentsID.length;

export const sortFilmsByRated = (a, b) => b.filmInfo.rating - a.filmInfo.rating;

export const sortFilmsByDate = (a, b) => b.filmInfo.release.releaseDate - a.filmInfo.release.releaseDate;

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const getCommentsFilm = (allComments, commentsID) => allComments.filter((comment) => commentsID.includes(comment.id));

export const getAttributeByType = (type) => type.split(' ').map((el) => el.toLowerCase()).join('-');
