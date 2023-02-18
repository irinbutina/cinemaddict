import dayjs from 'dayjs';

// const FULL_DATE_FORMAT = 'DD MMMM YYYY';
// const SHORT_DATE_FORMAT = 'YYYY';
// const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:mm';
const MINUTE_IN_HOUR = 60;
const MAX_SYMBOL_SHORT_TEXT = 139;


export const getFormatDate = (date, format) => dayjs(date).format(format);

export const humanizeDuration = (duration) => {
  const durationHours = Math.floor(duration / MINUTE_IN_HOUR);
  const durationMinutes = duration % MINUTE_IN_HOUR;
  return durationHours === 0 ? `${durationMinutes}m` : `${durationHours}h ${durationMinutes}m`;
};

export const descriptionTextShort = (text) => text.length <= MAX_SYMBOL_SHORT_TEXT ? text : `${text.slice(0, MAX_SYMBOL_SHORT_TEXT)}…`;

