import React from 'react';
import FilterTags from './FilterTags';
import Sort from './Sort';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGridView, toggleListView } from '../features/filterSlice';

const ShopHeader = ({ filteredProducts }) => {
  const dispatch = useDispatch();
  const { gridView, listView } = useSelector((state) => state.filter);

  const toggleGrid = () => {
    dispatch(toggleGridView());
  };

  const toggleList = () => {
    dispatch(toggleListView());
  };

  return (
    <div className="w-full flex flex-col gap-4 px-6 mb-4 md:px-8">
      {/* Header Top */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--clr-primary)] tracking-tight">
          PNEAKER SHOP
        </h1>

        <div className="flex items-center justify-between md:justify-end gap-6">
          <span className="text-gray-600 font-medium">
            {filteredProducts && filteredProducts.length + ' sneakers'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleGrid}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                gridView
                  ? 'bg-[var(--clr-mocha-2)] text-white border-[var(--clr-mocha-2)]'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
              title="Grid View"
            >
              <GridViewIcon className="text-xl" />
            </button>

            <button
              onClick={toggleList}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                listView
                  ? 'bg-[var(--clr-mocha-2)] text-white border-[var(--clr-mocha-2)]'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
              title="List View"
            >
              <ViewListIcon className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Header Bottom */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Sort />
        <FilterTags />
      </div>
    </div>
  );
};

export default ShopHeader;

