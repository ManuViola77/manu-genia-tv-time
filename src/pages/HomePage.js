import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import BackButton from "components/BackButton/BackButton";
import MoviesList from "components/MoviesList/MoviesList";
import { FIRST_PAGE } from "constants/common";
import { useDispatch } from "hooks";
import {
  getMovieFeed,
  getMoviesByGenre,
  resetMovieFeed,
  resetMoviesByGenre,
} from "state/actions/feedActions";
import "./pages-style.css";
import isEmpty from "lodash/isEmpty";

const DEFAULT_OPTIONS = {
  language: "en-US",
  page: FIRST_PAGE,
};

const HomePage = () => {
  /* https://api.themoviedb.org/3/discover/movie?api_key=37b2654d338023c318312c90b5eee0ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 */

  const { genreId } = useParams();

  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const getMovies = useDispatch(getMovieFeed);
  const getMoviesGenre = useDispatch(getMoviesByGenre);
  const resetTheMovieFeed = useDispatch(resetMovieFeed);
  const resetTheMoviesByGenre = useDispatch(resetMoviesByGenre);
  const handleOnPressBack = () => {
    genreId ? resetTheMoviesByGenre() : resetTheMovieFeed();
    setOptions(DEFAULT_OPTIONS);
  };

  const {
    lastPageFetched = FIRST_PAGE,
    movies = [],
    moviesByGenre = [],
    moviesByGenreLastPageFetched = FIRST_PAGE,
  } = useSelector(
    ({
      feed: {
        movies,
        lastPageFetched,
        moviesByGenre,
        moviesByGenreLastPageFetched,
      } = {},
    }) =>
      ({
        movies,
        lastPageFetched,
        moviesByGenre,
        moviesByGenreLastPageFetched,
      } || {})
  );

  const infiniteScroll = useCallback(() => {
    // End of the document reached?
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      const newOptions = {
        ...options,
        page: options.page + 1,
      };
      setOptions(newOptions);
      !!genreId ? getMoviesGenre(options) : getMovies(newOptions);
    }
  }, [getMovies, options, genreId, getMoviesGenre]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infiniteScroll]);

  useEffect(() => {
    if (!genreId) {
      if (
        isEmpty(movies) ||
        lastPageFetched > options.page ||
        genreId !== options.with_genres
      ) {
        const newOptions = {
          ...options,
          page: moviesByGenreLastPageFetched,
          with_genres: genreId,
        };
        setOptions(newOptions);
        getMovies(newOptions);
      }
    } else {
      if (
        isEmpty(moviesByGenre) ||
        moviesByGenreLastPageFetched > options.page ||
        genreId !== options.with_genres
      ) {
        const newOptions = {
          ...options,
          page: moviesByGenreLastPageFetched,
          with_genres: genreId,
        };
        setOptions(newOptions);
        getMoviesGenre(newOptions);
      }
    }
  }, [
    getMovies,
    lastPageFetched,
    movies,
    options,
    genreId,
    getMoviesGenre,
    moviesByGenreLastPageFetched,
    moviesByGenre,
  ]);

  return (
    <>
      <BackButton handleOnPressBack={handleOnPressBack} />
      <MoviesList movies={genreId ? moviesByGenre : movies} />
    </>
  );
};

export default HomePage;
