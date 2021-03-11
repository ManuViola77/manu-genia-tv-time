import httpClient from "httpClient";

import { applyQueryParams } from "utils/helpers";

class feedService {
  static getMovieFeed(options) {
    return httpClient.get(applyQueryParams("discover/movie", options));
  }

  static getMovieDetails({ id, options }) {
    return httpClient.get(applyQueryParams(`movie/${id}`, options));
  }
}

export default feedService;
