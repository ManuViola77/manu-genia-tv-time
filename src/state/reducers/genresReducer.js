import { createReducer } from "@reduxjs/toolkit";

import { getGenresFulfilled } from "state/actions/genresActions";

const initialState = {
  genres: [],
};

const actionHandlers = {
  [getGenresFulfilled]: (state, { payload }) => {
    state.genres = payload;
  },
};

export default createReducer(initialState, actionHandlers);
