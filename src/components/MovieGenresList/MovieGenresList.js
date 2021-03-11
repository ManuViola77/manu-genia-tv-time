import React from "react";

const MovieGenresList = ({ genres }) => {
  return (
    <div className="flex-row justify-content-center">
      {genres?.map(({ name }) => (
        <div className="genre-pill"> {name} </div>
      ))}
    </div>
  );
};

export default MovieGenresList;
