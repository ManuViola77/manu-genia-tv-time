import React from "react";

import BackButton from "components/BackButton/BackButton";
import MoviesList from "components/MoviesList/MoviesList";
import useHomePage from "hooks/useHomePage";
import "./pages-style.css";

const HomePage = () => {
  const { handleOnPressBack, movies, options } = useHomePage();

  return (
    <>
      <BackButton handleOnPressBack={handleOnPressBack} />
      <MoviesList movies={movies} filters={options} />
    </>
  );
};

export default HomePage;
