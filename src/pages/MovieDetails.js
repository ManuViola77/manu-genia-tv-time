import React from "react";
import { useParams } from "react-router";

const MovieDetails = () => {
  let { id } = useParams();
  return <div>This are the details of the movie with id {id}</div>;
};

export default MovieDetails;
