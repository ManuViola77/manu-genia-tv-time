import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import Blur from "react-blur";

import imdbLogo from "assets/imdbLogo.png";
import BackButton from "components/BackButton/BackButton";
import MovieGenresList from "components/MovieGenresList/MovieGenresList";
import { useDispatch } from "hooks";
import { getMovieDetails } from "state/actions/feedActions";
import { getYearFromDate } from "utils/dateFormater";
import { getImagePath, openInNewTab, openIMDBLink } from "utils/helpers";

const MovieDetails = () => {
  let { id } = useParams();

  const getTheMovieDetails = useDispatch(getMovieDetails);
  const movieDetails = useSelector(
    ({ feed: { selectedMovie } = {} }) => selectedMovie || []
  );

  const {
    backdropPath,
    genres,
    homepage,
    imdbId,
    overview,
    posterPath,
    releaseDate,
    title,
    voteAverage,
  } = movieDetails;
  const backdropCompletePath = !!backdropPath && getImagePath(backdropPath);
  const posterCompletePath = !!posterPath && getImagePath(posterPath);

  const { data: { darkVibrant, darkMuted, muted } = {} } = usePalette(
    posterCompletePath
  );

  console.log("movieDetails: ", movieDetails);

  useEffect(() => {
    getTheMovieDetails({ id });
  }, [getTheMovieDetails, id]);

  return (
    <div className="app-header" style={{ backgroundColor: darkVibrant }}>
      <Blur
        img={backdropCompletePath || posterCompletePath}
        blurRadius={20}
        enableStyles
        style={{
          height: 300,
          width: "100%",
        }}
      />
      <img
        alt="poster"
        className="poster position-absolute-top"
        src={posterCompletePath}
      />
      <BackButton extraClasses="position-absolute-top" />
      {!!voteAverage && (
        <div
          className="rate-badge"
          style={{
            backgroundColor: darkMuted,
            borderColor: muted,
          }}
        >
          <span className="rate">
            <h4>{voteAverage}</h4>
          </span>
        </div>
      )}
      <div className="info-container">
        <div className="position-relative">
          <h1
            className="movie-title"
            onClick={() => !!homepage && openInNewTab(homepage)}
          >{`${title} ${getYearFromDate(releaseDate)}`}</h1>
          <img
            alt="imdbLogo"
            src={imdbLogo}
            className="imdb-logo position-absolute-top"
            onClick={() => !!imdbId && openIMDBLink(imdbId)}
          />
        </div>
        <MovieGenresList genres={genres} />
        <span className="details-titles">Description:</span>
        <p className="info-text">{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
