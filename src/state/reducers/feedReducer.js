import { createReducer } from "@reduxjs/toolkit";

import { FIRST_PAGE } from "constants/common";
import {
  getMovieFeedFulfilled,
  getMovieDetailsFulfilled,
  changeFeedFilters,
  resetMovieFeed,
} from "state/actions/feedActions";

const initialFilters = {
  language: "en-US",
  page: FIRST_PAGE,
};

const initialState = {
  movies: [],
  lastPageFetched: null,
  totalPages: null,
  totalResults: null,
  selectedMovie: {},
  filters: initialFilters,
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
    state.lastPageFetched = payload?.page;
    state.totalPages = payload?.totalPages;
    state.totalResults = payload?.totalResults;
  },

  [getMovieDetailsFulfilled]: (state, { payload }) => {
    state.selectedMovie = payload;
  },

  [changeFeedFilters]: (state, { payload }) => {
    state.filters = payload;
  },

  [resetMovieFeed]: () => {
    return initialState;
  },
};

export default createReducer(initialState, actionHandlers);
