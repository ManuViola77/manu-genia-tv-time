import { createReducer } from "@reduxjs/toolkit";
import { max } from "lodash";

import { FIRST_PAGE } from "constants/common";
import {
  getMovieFeedFulfilled,
  getMovieDetailsFulfilled,
  getMoviesByGenreFulfilled,
  resetMovieFeed,
  resetMoviesByGenre,
} from "state/actions/feedActions";

const moviesInitialState = {
  movies: [],
  lastPageFetched: null,
  totalPages: null,
  totalResults: null,
};

const moviesByGenreInitialState = {
  moviesByGenre: [],
  moviesByGenreLastPageFetched: null,
  moviesByGenreTotalPages: null,
  moviesByGenreTotalResults: null,
};

const selectedMovieInitialState = {
  selectedMovie: {},
};

const initialState = {
  ...moviesInitialState,
  ...moviesByGenreInitialState,
  ...selectedMovieInitialState,
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

  [getMoviesByGenreFulfilled]: (state, { payload }) => {
    switch (payload?.page) {
      case FIRST_PAGE:
        state.moviesByGenre = payload?.results;
        break;

      default:
        state.moviesByGenre =
          payload?.page > state.moviesByGenreLastPageFetched
            ? [...state.moviesByGenre, ...payload?.results]
            : state.moviesByGenre;
        break;
    }
    state.moviesByGenreLastPageFetched = max([
      payload?.page,
      state.moviesByGenreLastPageFetched,
    ]);
    state.moviesByGenreTotalPages = payload?.moviesByGenreTotalPages;
    state.moviesByGenreTotalResults = payload?.moviesByGenreTotalResults;
  },

  [resetMovieFeed]: () => {
    return { initialState };
  },

  [resetMoviesByGenre]: (state) => {
    return {
      ...state,
      ...moviesByGenreInitialState,
    };
  },
};

export default createReducer(initialState, actionHandlers);
