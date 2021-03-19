import React from "react";

import MovieItem from "components/MovieItem/MovieItem";
import "./MoviesList.css";
import MovieFilter from "components/MovieFilter/MovieFilter";

const MoviesList = ({ movies, filters }) => (
  <>
    <div className="movies-filters">
      {Object.keys(filters).map((key) => (
        <MovieFilter filterKey={key} value={filters[key]} />
      ))}
    </div>
    <div className="movies-list-container">
      {movies.map((item) => (
        <MovieItem key={item.id} movie={item} />
      ))}
    </div>
  </>
);

export default MoviesList;
