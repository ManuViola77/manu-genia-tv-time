import React from "react";
import { useParams } from "react-router";

const MoviesGenrePage = () => {
  let { id } = useParams();

  return (
    <div>
      <p>HOLAAAAA SOY UN TEXTO LARGO PARA QUE ME DEJE ACAAAA ID: {id}</p>
    </div>
  );
};

export default MoviesGenrePage;
