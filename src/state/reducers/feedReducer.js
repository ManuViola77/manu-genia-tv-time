import { createReducer } from "@reduxjs/toolkit";
import { max } from "lodash";

import { FIRST_PAGE } from "constants/common";
import {
  getMovieFeedFulfilled,
  getMovieDetailsFulfilled,
  resetMovieFeed,
} from "state/actions/feedActions";

const initialState = {
  movies: [],
  lastPageFetched: null,
  totalPages: null,
  totalResults: null,
  selectedMovie: {},
};

const actionHandlers = {
  [getMovieFeedFulfilled]: (state, { payload }) => {
    switch (payload?.page) {
      case FIRST_PAGE:
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

  [getMovieDetailsFulfilled]: (state, { payload }) => {
    state.selectedMovie = payload;
  },

  [resetMovieFeed]: () => {
    return initialState;
  },
};

export default createReducer(initialState, actionHandlers);
