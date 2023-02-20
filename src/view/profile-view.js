import AbstractView from '../framework/view/abstract-view.js';
import { PROFILE_RATING } from '../const.js';


const getProfileTitle = (rating) => {
  switch (true) {
    case rating === 0:
      return '';
    case rating > 0 && rating <= 10:
      return PROFILE_RATING.NOVICE;
    case rating > 10 && rating <= 20:
      return PROFILE_RATING.FAN;
    case rating > 20:
      return PROFILE_RATING.MOVIE_BUFF;
  }
};

const createProfileTemplate = (rating) => {
  const titleRating = getProfileTitle(rating);
  const isRating = !titleRating ? 'visually-hidden' : '';
  return `<section class="header__profile profile">
  <p class="profile__rating ${isRating}">${titleRating}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileView extends AbstractView {
  constructor({rating}) {
    super();
    this.rating = rating;
  }

  get template() {
    return createProfileTemplate(this.rating);
  }
}
