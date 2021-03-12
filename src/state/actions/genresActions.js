import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

import genresService from "services/genresService";
import parseError from "utils/parseError";

export const getGenres = createAsyncThunk("GENRES", async (options) => {
  try {
    const { data } = await genresService.getGenres(options);
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const { fulfilled: getGenresFulfilled } = getGenres;
