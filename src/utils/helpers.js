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
