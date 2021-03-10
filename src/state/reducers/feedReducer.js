import { createReducer } from "@reduxjs/toolkit";
import { max } from "lodash";

import {
  getMovieFeedFulfilled,
  resetMovieFeed,
} from "state/actions/feedActions";

const initialState = {
  movies: [],
  lastPageFetched: 0,
  totalPages: 0,
  totalResults: 0,
};

const actionHandlers = {
  [getMovieFeedFulfilled]: (state, { payload }) => {
    switch (payload?.page) {
      case 1:
        state.movies = payload?.results;
        break;

      default:
        state.movies =
          payload?.page > state.lastPageFetched
            ? [...state.movies, ...payload?.results]
            : state.movies;
        break;
    }
    state.lastPageFetched = max([payload?.page, state.lastPageFetched]);
    state.totalPages = payload?.totalPages;
    state.totalResults = payload?.totalResults;
  },

  [resetMovieFeed]: () => {
    return initialState;
  },
};

export default createReducer(initialState, actionHandlers);
