import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearFilters,
  removeBrandFilter,
  removePriceFilter,
  removeSizeFilter,
  removeColorFilter,
} from '../features/filterSlice';
import FilterTag from './FilterTag';

const FilterTags = () => {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { size, brand, price, color } = filters;

  const clearFiltersHandler = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="flex flex-wrap w-full">
      {size !== null && (
        <FilterTag
          removeFilter={() => dispatch(removeSizeFilter())}
          clearIcon
          label={`Size: ${size}`}
        />
      )}
      {brand !== null && (
        <FilterTag
          removeFilter={() => dispatch(removeBrandFilter())}
          clearIcon
          label={`Brand: ${brand}`}
        />
      )}
      {color !== null && (
        <FilterTag
          removeFilter={() => dispatch(removeColorFilter())}
          clearIcon
          label={`Color: ${color}`}
        />
      )}
      {price.length > 0 && (
        <FilterTag
          removeFilter={() => dispatch(removePriceFilter())}
          clearIcon
          label={`Price: ${price[0]}~${price[1]}`}
        />
      )}
      {(size || brand || color || price.length > 0) && (
        <button
          onClick={clearFiltersHandler}
          className="flex text-gray-500 cursor-pointer text-sm h-5 bg-transparent border-none hover:text-gray-700 transition-colors duration-300"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterTags;
