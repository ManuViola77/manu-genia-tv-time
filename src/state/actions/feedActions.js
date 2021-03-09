import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const { fulfilled: getMovieFeedFulfilled } = getMovieFeed;
