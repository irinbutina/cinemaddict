import dayjs from 'dayjs';
// import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(duration);
dayjs.extend(relativeTime);


const FULL_DATE_FORMAT = 'D MMMM YYYY';
// const SHORT_DATE_FORMAT = 'YYYY';
const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:mm';
const MINUTE_IN_HOUR = 60;
const MAX_SYMBOL_SHORT_TEXT = 139;


export const getFormatDate = (date, format) => dayjs(date).format(format);

export const humanizeDuration = (duration) => {
  const durationHours = Math.floor(duration / MINUTE_IN_HOUR);
  const durationMinutes = duration % MINUTE_IN_HOUR;
  return durationHours === 0 ? `${durationMinutes}m` : `${durationHours}h ${durationMinutes}m`;
};

export const humanizeReleaseDate = (date) => getFormatDate(date, FULL_DATE_FORMAT);

export const humanizeCommentsDate = (date) => (dayjs().diff(date, 'm') <= 2880) ? dayjs(date).fromNow() : dayjs(date).format(COMMENT_DATE_FORMAT);

export const descriptionTextShort = (text) => text.length <= MAX_SYMBOL_SHORT_TEXT ? text : `${text.slice(0, MAX_SYMBOL_SHORT_TEXT)}…`;

