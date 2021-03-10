import React from "react";

import MovieItem from "components/MovieItem/MovieItem";
import "./MoviesList.css";

const MoviesList = ({ movies }) =>
  console.log("movies: ", movies) || (
    <div className="movies-list-container">
      {movies.map((item) => (
        <MovieItem key={item.id} movie={item} />
      ))}
    </div>
  );

export default MoviesList;
