import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from './random.js';
import { COMMENTS_EMOTION } from '../const.js';


// // import duration from 'dayjs/plugin/duration';
// import relativeTime from 'dayjs/plugin/relativeTime';

// // dayjs.extend(duration);
// dayjs.extend(relativeTime);


const COMMENTS_COUNT = 5;


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
  const date = dayjs().subtract(getRandomInteger(0, 10000), 'm');
  return {
    id: nanoid(),
    author: getRandomArrayElement(COMMENTS_AUTORS),
    commentText: getRandomArrayElement(COMMENTS_TEXTS),
    date,
    emotion: getRandomArrayElement(COMMENTS_EMOTION),
  };
};

const generateCommentsList = (count) => Array.from({length: count}, generateComment);

const commentsList = generateCommentsList(COMMENTS_COUNT);
export { commentsList };
