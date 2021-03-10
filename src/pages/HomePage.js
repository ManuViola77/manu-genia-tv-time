import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import BackButton from "components/BackButton/BackButton";
import MoviesList from "components/MoviesList/MoviesList";
import { useDispatch } from "hooks";
import { getMovieFeed } from "state/actions/feedActions";
import "./pages-style.css";

const HomePage = () => {
  /* https://api.themoviedb.org/3/discover/movie?api_key=37b2654d338023c318312c90b5eee0ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 */
  const getMovies = useDispatch(getMovieFeed);
  const movies = useSelector(({ feed: { movies } = {} }) => movies || []);

  useEffect(() => {
    getMovies({ language: "en-US" });
  }, [getMovies]);

  return (
    <>
      <BackButton />
      <MoviesList movies={movies} />
    </>
  );
};

export default HomePage;
