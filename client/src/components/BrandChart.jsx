import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, removeBrandFilter } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';

const BrandChart = () => {
  const filters = useSelector((state) => state.filter);
  const { menuState, handleToggle } = useToggle();
  const dispatch = useDispatch();
  const { brand } = filters;

  const handleSelect = (e) => {
    const { name, checked } = e.target;
    dispatch(checked ? addBrand(name) : removeBrandFilter(name));
  };

  const brands = ['Giày Dunk', 'Giày Jordan', 'Giày Yeezy', 'Giày Puma'];

  const displayBrandName = (brandName) => brandName.replace(/^Giày\s+/i, '');

  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex justify-between items-center py-4">
        <h4 className="font-medium text-gray-900">Brand</h4>
        <button 
          onClick={handleToggle}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {menuState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </button>
      </div>

      {menuState && (
        <div className="pb-4">
          {brands.map((item) => (
            <div key={item} className="flex items-center mb-4">
              <input
                type="checkbox"
                name={item}
                onChange={handleSelect}
                checked={brand === item}
                className="w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-red-500 mr-3"
              />
              <label className="font-medium text-gray-900">
                {displayBrandName(item)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandChart;
