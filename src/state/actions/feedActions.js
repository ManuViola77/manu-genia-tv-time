import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

import feedService from "services/feedService";
import parseError from "utils/parseError";

export const getMovieFeed = createAsyncThunk("MOVIE_FEED", async (options) => {
  try {
    const { data } = await feedService.getMovieFeed(options);
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const getMovieDetails = createAsyncThunk(
  "MOVIE_DETAILS",
  async (params) => {
    try {
      const { data } = await feedService.getMovieDetails(params);
      return data;
    } catch ({ response: { data } }) {
      throw parseError(data);
    }
  }
);

export const resetMovieFeed = createAction("feed/reset");

export const { fulfilled: getMovieFeedFulfilled } = getMovieFeed;
export const { fulfilled: getMovieDetailsFulfilled } = getMovieDetails;
