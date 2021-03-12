import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { FIRST_PAGE } from "constants/common";
import { useDispatch } from "hooks";
import { getMovieFeed, resetMovieFeed } from "state/actions/feedActions";

const DEFAULT_OPTIONS = {
  language: "en-US",
  page: FIRST_PAGE,
};

const useHomePage = () => {
  /* https://api.themoviedb.org/3/discover/movie?api_key=37b2654d338023c318312c90b5eee0ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 */
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const getMovies = useDispatch(getMovieFeed);
  const resetTheMovieFeed = useDispatch(resetMovieFeed);
  const handleOnPressBack = () => {
    resetTheMovieFeed();
    setOptions(DEFAULT_OPTIONS);
  };

  const { lastPageFetched = FIRST_PAGE, movies = [] } = useSelector(
    ({ feed: { movies, lastPageFetched } = {} }) =>
      ({ movies, lastPageFetched } || {})
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
      getMovies(newOptions);
    }
  }, [getMovies, options]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infiniteScroll]);

  useEffect(() => {
    lastPageFetched > options.page &&
      setOptions({ ...options, page: lastPageFetched });
    isEmpty(movies) && getMovies(options);
  }, [getMovies, lastPageFetched, movies, options]);

  return {
    handleOnPressBack,
    movies,
  };
};

export default useHomePage;
