import queryString from "query-string";
import isEmpty from "lodash/isEmpty";

const API_KEY = "api_key";

export const applyQueryParams = (url, params = {}, addApiKey = true) => {
  if (isEmpty(params) && !addApiKey) {
    return url;
  }
  const parameters = addApiKey
    ? {
        ...params,
        [API_KEY]: process.env.REACT_APP_API_KEY,
      }
    : params;
  const queryParams = queryString.stringify(parameters);
  return `${url}?${queryParams}`;
};

export const getImagePath = (url) => `${process.env.REACT_APP_IMAGE_URL}${url}`;

export const limitTextLength = (text, maxLength) =>
  text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;

export const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const openIMDBLink = (url) => {
  openInNewTab(`${process.env.REACT_APP_IMDB_URL}${url}`);
};
