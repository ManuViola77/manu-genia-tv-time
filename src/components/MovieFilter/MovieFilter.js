import React from "react";

import "./MovieFilter.css";

const MovieFilter = ({ filterKey, value }) => (
  <div className="filter-container">
    {filterKey}: {value}
  </div>
);

export default MovieFilter;
