import React from "react";

import BackButton from "components/BackButton/BackButton";
import "./pages-style.css";

function HomePage() {
  /* https://api.themoviedb.org/3/discover/movie?api_key=37b2654d338023c318312c90b5eee0ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 */
  return (
    <>
      <BackButton />
    </>
  );
}

export default HomePage;
