import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { FIRST_PAGE } from "constants/common";
import { useDispatch } from "hooks";
import { getMovieFeed, changeFeedFilters } from "state/actions/feedActions";

const MovieGenresList = ({ genres }) => {
  const history = useHistory();

  const getMovies = useDispatch(getMovieFeed);
  const updateFilters = useDispatch(changeFeedFilters);

  const filters = useSelector(({ feed: { filters } = {} }) => filters);

  const handleOnGenreClick = (genreId) => {
    const newFilters = {
      ...filters,
      page: FIRST_PAGE,
      with_genres: genreId,
    };
    updateFilters(newFilters);
    getMovies(newFilters);
    history.goBack();
  };

  return (
    <div className="flex-row justify-content-center">
      {genres?.map(({ id, name }) => (
        <div className="genre-pill" onClick={() => handleOnGenreClick(id)}>
          {" "}
          {name}{" "}
        </div>
      ))}
    </div>
  );
};

export default MovieGenresList;
