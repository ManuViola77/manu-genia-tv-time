import React, { useState } from "react";
import { useHistory } from "react-router";

import defaultMovieImage from "assets/defaultMovieImage.png";
import { MAX_TITLE_LENGTH } from "constants/common";
import { getFormattedDate } from "utils/dateFormater";
import { getImagePath, limitTextLength } from "utils/helpers";
import "./MovieItem.css";

const MovieItem = ({
  movie: { id, title, posterPath, releaseDate, voteAverage } = {},
}) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const handlePosterLoaded = () => setIsPosterLoaded(true);

  const history = useHistory();
  const goToMovieDetailsPage = () => history.push(`/movie/${id}`);

  return (
    <div className="movie-item-container" onClick={goToMovieDetailsPage}>
      <div className="image-badge-container">
        <img
          alt="poster"
          className="poster-image"
          onLoad={handlePosterLoaded}
          src={isPosterLoaded ? getImagePath(posterPath) : defaultMovieImage}
        />
        <div className="badge">
          <span className="rate">
            <h6>{voteAverage}</h6>
          </span>
        </div>
      </div>
      <h6 className="title">
        {limitTextLength(title, MAX_TITLE_LENGTH)}
        <span className="date">{getFormattedDate(releaseDate)}</span>
      </h6>
    </div>
  );
};

export default MovieItem;
