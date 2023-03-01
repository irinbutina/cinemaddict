import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { commentsList } from './comment.js';
import { AGE_RATINGS, COUNTRIES, DESCRIPTION_TEXT, FILMS, GENRES, MaxCount, MinCount, teamFilm } from './const.js';
import { getRandomArrayElement, getRandomArrayElements, getRandomBoolean, getRandomInteger } from './random.js';

const descriptionText = DESCRIPTION_TEXT.split('. ');

const generateCard = () => {
  const comments = getRandomArrayElements(commentsList, MinCount.COMMENTS, MaxCount.COMMENTS);
  const commentsID = comments.map((comment) => comment.id);
  // const commentsID = generateCommentsList(getRandomInteger(MinCount.COMMENTS, MaxCount.COMMENTS)).map((comment) => comment.id);
  const film = getRandomArrayElement(FILMS);
  const rating = (Math.random() * MaxCount.RATING).toFixed(1);
  const ageRating = getRandomArrayElement(AGE_RATINGS);
  const poster = film.poster;
  const director = getRandomArrayElement(teamFilm.PRODUCER);
  const writers = getRandomArrayElements(teamFilm.WRITERS, MinCount.WRITERS, MaxCount.WRITERS);
  const actors = getRandomArrayElements(teamFilm.ACTORS, MinCount.ACTORS, MaxCount.ACTORS);
  const releaseDate = dayjs('1920').add(getRandomInteger(0, 37200), 'd');
  const releaseCountry = getRandomArrayElement(COUNTRIES);
  const duration = getRandomInteger(MinCount.DURATION, MaxCount.DURATION);
  const genre = getRandomArrayElements(GENRES, MinCount.GENRES, MaxCount.GENRES);
  const description = `${getRandomArrayElements(descriptionText, MinCount.DESCRIPTION_COUNT, descriptionText.length).join('. ')}.`;

  return {
    commentsID,
    filmInfo: {
      title: film.title,
      alternativeTitle: film.title,
      rating,
      ageRating,
      poster,
      director,
      writers,
      actors,
      release: {
        releaseDate,
        releaseCountry
      },
      duration,
      genre,
      description,
    },
    userDetails: {
      isWatchlist: getRandomBoolean(),
      isHistory: getRandomBoolean(),
      watchingDate: dayjs(),
      isFavorite: getRandomBoolean(),
    }
  };
};

const generateCardWithId = () => ({
  id: nanoid(),
  ...generateCard(),
});

export {generateCardWithId};

