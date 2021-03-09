import httpClient from "httpClient";

import { applyQueryParams } from "utils/helpers";

class feedService {
  static getMovieFeed(options) {
    return httpClient.get(applyQueryParams("discover/movie", options));
  }
}

export default feedService;
