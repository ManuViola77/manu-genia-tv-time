import React from "react";
import Select from "react-select";

import { SELECT } from "constants/inputTypes";
import useMovieFilters from "hooks/useMovieFilters";

import "./MovieFilter.css";

const MovieFilter = ({ filterKey, value }) => {
  const {
    getFiltersType,
    getSelectedOption,
    handleOptionChange,
  } = useMovieFilters();
  const { type, selectOptions } = getFiltersType(filterKey);

  return (
    <div className="filter-container">
      {filterKey}: {value} {type}
      {type === SELECT && (
        <Select
          options={selectOptions}
          value={getSelectedOption(selectOptions, value)}
          onChange={(newValue) => handleOptionChange(filterKey, newValue)}
        />
      )}
    </div>
  );
};

export default MovieFilter;
