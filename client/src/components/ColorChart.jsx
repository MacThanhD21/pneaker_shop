import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import { addColor } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';

const ColorChart = () => {
  const dispatch = useDispatch();
  const { data } = useQuery(GET_PRODUCTS);
  const { menuState, handleToggle } = useToggle();

  const shoeColors = new Set(
    data?.getProducts.reduce((res, { color }) => [...res, ...color], [])
  );

  const handleClick = (color) => {
    dispatch(addColor(color));
  };

  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex justify-between items-center py-4">
        <h4 className="font-medium text-gray-900">Colors</h4>
        <button 
          onClick={handleToggle}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {menuState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </button>
      </div>

      {menuState && (
        <div className="w-full pb-4">
          <div className="flex flex-wrap gap-4">
            {[...shoeColors].map((color, index) => (
              <button
                key={index}
                onClick={() => handleClick(color)}
                className="relative group"
                title={color}
              >
                <div 
                  className="w-8 h-8 rounded-full border-2 border-gray-200 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">
                    {color}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorChart;
