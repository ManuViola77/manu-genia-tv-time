import React from "react";
import { useHistory } from "react-router";

const MovieGenresList = ({ genres }) => {
  const history = useHistory();
  const goToMoviesGenrePage = (id) => history.push(`/movies/genre/${id}`);

  return (
    <div className="flex-row justify-content-center">
      {genres?.map(({ id, name }) => (
        <div className="genre-pill" onClick={() => goToMoviesGenrePage(id)}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default MovieGenresList;
