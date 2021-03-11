import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { useDispatch } from "hooks";
import { getMovieDetails } from "state/actions/feedActions";
import { getImagePath } from "utils/helpers";

const MovieDetails = () => {
  let { id } = useParams();

  const getTheMovieDetails = useDispatch(getMovieDetails);
  const movieDetails = useSelector(
    ({ feed: { selectedMovie } = {} }) => selectedMovie || []
  );

  const { posterPath } = movieDetails;

  console.log("movieDetails: ", movieDetails);

  useEffect(() => {
    getTheMovieDetails({ id });
  }, [getTheMovieDetails, id]);

  return (
    <div>
      <img
        alt="poster"
        className="full-poster"
        /* onLoad={handlePosterLoaded} */
        /* src={isPosterLoaded ? getImagePath(posterPath) : defaultMovieImage} */
        src={getImagePath(posterPath)}
      />
    </div>
  );
};

export default MovieDetails;
