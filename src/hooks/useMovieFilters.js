import { useCallback } from "react";
import { useSelector } from "react-redux";

import { TEXT, SELECT } from "constants/inputTypes";
import { GENRE } from "constants/movieFilters";
import { useDispatch } from "hooks";
import { getMovieFeed, changeFeedFilters } from "state/actions/feedActions";

const useMovieFilters = () => {
  const filters = useSelector(({ feed: { filters } = {} }) => filters);
  const genres = useSelector(({ genres: { genres } = {} }) => genres || []);

  const getMovies = useDispatch(getMovieFeed);
  const updateFilters = useDispatch(changeFeedFilters);

  const handleOptionChange = useCallback(
    (filterKey, newValue) => {
      const newFilters = {
        ...filters,
        [filterKey]: newValue.value,
      };
      updateFilters(newFilters);
      getMovies(newFilters);
    },
    [filters, updateFilters]
  );

  const getFiltersType = (filterKey) => {
    let type = TEXT;
    let selectOptions;

    switch (filterKey) {
      case GENRE:
        type = SELECT;
        selectOptions = genres.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        break;
      default:
        break;
    }

    return { type, selectOptions };
  };

  const getSelectedOption = (options, selectedValue) => {
    return options.filter(({ value }) => value === selectedValue);
  };

  return { getFiltersType, getSelectedOption, handleOptionChange };
};

export default useMovieFilters;
