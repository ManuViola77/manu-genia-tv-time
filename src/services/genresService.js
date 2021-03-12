import httpClient from "httpClient";

import { applyQueryParams } from "utils/helpers";

class feedService {
  static getGenres(options) {
    return httpClient.get(applyQueryParams("/genre/movie/list", options));
  }
}

export default feedService;
