import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { useDispatch } from "hooks";
import {
  getMovieFeed,
  changeFeedFilters,
  resetMovieFeed,
} from "state/actions/feedActions";

const useHomePage = () => {
  /* https://api.themoviedb.org/3/discover/movie?api_key=37b2654d338023c318312c90b5eee0ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 */
  const getMovies = useDispatch(getMovieFeed);
  const updateFilters = useDispatch(changeFeedFilters);
  const resetTheMovieFeed = useDispatch(resetMovieFeed);

  const handleOnPressBack = () => {
    resetTheMovieFeed();
  };

  const { movies = [], filters: options } = useSelector(
    ({ feed: { movies, filters } = {} }) => ({ movies, filters } || {})
  );

  const infiniteScroll = useCallback(() => {
    // End of the document reached?
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      const newFilters = {
        ...options,
        page: options.page + 1,
      };
      updateFilters(newFilters);
      getMovies(newFilters);
    }
  }, [getMovies, options, updateFilters]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infiniteScroll]);

  useEffect(() => {
    isEmpty(movies) && getMovies(options);
  }, [getMovies, movies, options]);

  return {
    handleOnPressBack,
    movies,
  };
};

export default useHomePage;
