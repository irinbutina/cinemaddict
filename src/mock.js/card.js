import dayjs from 'dayjs';
import { generateCommentsList } from './comment.js';
import { COUNTRIES, DESCRIPTION_TEXT, FILMS, GENRES, MaxCount, MinCount, teamFilm } from './const.js';
import { getRandomArrayElement, getRandomArrayElements, getRandomBoolean, getRandomInteger } from './random.js';

const descriptionText = DESCRIPTION_TEXT.split('. ');

const generateCard = () => {
  const commentsID = generateCommentsList(getRandomInteger(MinCount.COMMENTS, MaxCount.COMMENTS)).map((comment) => comment.id);
  const film = getRandomArrayElement(FILMS);
  const rating = (Math.random() * MaxCount.RATING).toFixed(1);
  const poster = film.poster;
  const director = getRandomArrayElement(teamFilm.PRODUCER);
  const writers = getRandomArrayElements(teamFilm.WRITERS, MinCount.WRITERS, MaxCount.WRITERS);
  const actors = getRandomArrayElements(teamFilm.ACTORS, MinCount.ACTORS, MaxCount.ACTORS);
  const releaseDate = dayjs().add(getRandomInteger(0, 10), 'day');
  const releaseCountry = getRandomArrayElement(COUNTRIES);
  const duration = getRandomInteger(MinCount.MINUTES, MaxCount.MINUTES);
  const genre = getRandomArrayElements(GENRES, MinCount.GENRES, MaxCount.GENRES);
  const description = `${getRandomArrayElements(descriptionText, MinCount.DESCRIPTION_COUNT, descriptionText.length).join('. ')}.`;

  return {
    commentsID,
    filmInfo: {
      title: film.title,
      alternativeTitle: film.title,
      rating,
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
      watchlist: getRandomBoolean(),
      alreadyWatched: getRandomBoolean(),
      watchingDate: dayjs(),
      favorite: getRandomBoolean(),
    }
  };
};

export {generateCard};

