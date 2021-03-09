import { createReducer } from "@reduxjs/toolkit";
import { max } from "lodash";

import { getMovieFeedFulfilled } from "state/actions/feedActions";

const initialState = {
  movies: [],
  lastPageFetched: 0,
  totalPages: 0,
  totalResults: 0,
};

const actionHandlers = {
  [getMovieFeedFulfilled]: (state, { payload }) => {
    state.movies = payload?.results;
    state.lastPageFetched = max([payload?.page, state.lastPageFetched]);
    state.totalPages = payload?.totalPages;
    state.totalResults = payload?.totalResults;
  },
};

export default createReducer(initialState, actionHandlers);
