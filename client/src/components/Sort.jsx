import React from 'react';
import { useDispatch } from 'react-redux';
import { addSort } from '../features/filterSlice';

const Sort = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    dispatch(addSort(e.target.value));
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Sort by</label>
      <select
        onChange={handleSelect}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--clr-mocha-2)] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
      >
        <option value="" className="py-2">Sort</option>
        <option value="price-lowest" className="py-2">Price (Lowest)</option>
        <option value="price-highest" className="py-2">Price (Highest)</option>
        <option value="top-rated" className="py-2">Top rated</option>
      </select>
    </div>
  );
};

export default Sort;
