import React from "react";

import { getImagePath } from "utils/helpers";
import "./MovieItem.css";

const MovieItem = ({ movie: { originalTitle, posterPath } = {} }) => (
  <div className="movie-item-container">
    <img alt="poster" className="poster-image" src={getImagePath(posterPath)} />
    <p className="title">{originalTitle}</p>
  </div>
);

export default MovieItem;
