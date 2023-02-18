import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from './random.js';
import { COMMENTS_EMOTION } from '../const.js';

const COMMENTS_AUTORS = [
  'Lilly Sanchez',
  'Leah Rodriguez',
  'Uthman Alexander',
  'Delilah Long',
  'Seamus Hall',
  'Quirino Gonzalez',
  'Penn Robinson',
  'Giselle Watson',
  'Soren Phillips',
  'Ibraheem Gonzales',
  'Arabella Rogers',
  'Royal Jackson',
  'Xander Baker',
];

const COMMENTS_TEXTS = [
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Interesting setting and a good cast',
];

const generateComment = () => {
  const getDate = dayjs().add(getRandomInteger(0, 10), 'day');

  return {
    id: nanoid(),
    author: getRandomArrayElement(COMMENTS_AUTORS),
    comment: getRandomArrayElement(COMMENTS_TEXTS),
    date: getDate,
    emotion: getRandomArrayElement(COMMENTS_EMOTION),
  };
};

const generateCommentsList = (count) => Array.from({length: count}, generateComment);

export { generateComment, generateCommentsList };
