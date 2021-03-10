import React from "react";

import { getImagePath } from "utils/helpers";
import "./MovieItem.css";

const MovieItem = ({ movie: { title, posterPath, voteAverage } = {} }) => (
  <div className="movie-item-container">
    <div className="image-badge-container">
      <img
        alt="poster"
        className="poster-image"
        src={getImagePath(posterPath)}
      />
      <div className="badge">
        <span className="rate">
          <h6>{voteAverage}</h6>
        </span>
      </div>
    </div>
    <p className="title">{title}</p>
  </div>
);

export default MovieItem;
