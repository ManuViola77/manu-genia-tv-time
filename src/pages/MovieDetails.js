import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import Blur from "react-blur";

import BackButton from "components/BackButton/BackButton";
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

  const { data: { darkVibrant } = {} } = usePalette(getImagePath(posterPath));

  console.log("movieDetails: ", movieDetails);

  useEffect(() => {
    getTheMovieDetails({ id });
  }, [getTheMovieDetails, id]);

  return (
    <div className="app-header" style={{ backgroundColor: darkVibrant }}>
      <Blur
        img={getImagePath(posterPath)}
        blurRadius={20}
        enableStyles
        style={{
          height: 300,
          width: "100%",
        }}
      />
      <img
        alt="poster"
        className="poster position-absolute-top"
        src={getImagePath(posterPath)}
      />
      <BackButton extraClasses="position-absolute-top" />
    </div>
  );
};

export default MovieDetails;
