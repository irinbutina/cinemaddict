export const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const splitByWords = (words) => words.join(', ');

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
