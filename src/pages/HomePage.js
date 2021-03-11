import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";

import BackButton from "components/BackButton/BackButton";
import MoviesList from "components/MoviesList/MoviesList";
import { FIRST_PAGE } from "constants/common";
import { useDispatch } from "hooks";
import { getMovieFeed, resetMovieFeed } from "state/actions/feedActions";
import "./pages-style.css";

const DEFAULT_OPTIONS = {
  language: "en-US",
  page: FIRST_PAGE,
};

const HomePage = () => {
  /* https://api.themoviedb.org/3/discover/movie?api_key=37b2654d338023c318312c90b5eee0ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 */
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const getMovies = useDispatch(getMovieFeed);
  const resetTheMovieFeed = useDispatch(resetMovieFeed);
  const movies = useSelector(({ feed: { movies } = {} }) => movies || []);

  console.log("movies: ", movies);

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
    }
  }, [options]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infiniteScroll]);

  useEffect(() => {
    getMovies(options);
  }, [getMovies, options]);

  useEffect(
    () => () => {
      resetTheMovieFeed();
    },
    [resetTheMovieFeed]
  );

  return (
    <>
      <BackButton />
      <MoviesList movies={movies} />
    </>
  );
};

export default HomePage;
