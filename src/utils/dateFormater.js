import dayjs from "dayjs";

import { MOVIE_DATE_FORMAT, MOVIE_YEAR_FORMAT } from "constants/datesFormats";

export const getFormattedDate = (date) =>
  dayjs(new Date(date)).format(MOVIE_DATE_FORMAT);

export const getYearFromDate = (date) =>
  dayjs(new Date(date)).format(MOVIE_YEAR_FORMAT);
