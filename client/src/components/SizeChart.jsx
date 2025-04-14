import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { addSize } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';

const SizeChart = () => {
  const filters = useSelector((state) => state.filter);
  const { menuState, handleToggle } = useToggle();
  const dispatch = useDispatch();

  const { size } = filters;
  let sizes = [];

  const handleSizeClick = (size) => {
    dispatch(addSize(size));
  };

  for (let i = 37; i <= 48; i += 1) {
    sizes.push(i);
  }

  return (
    <div className="border-b-2 border-gray-200">
      <h4 className="flex justify-between items-center font-medium py-4">
        Size
        {menuState ? (
          <ArrowDropUpIcon
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleToggle}
          />
        ) : (
          <ArrowDropDownIcon
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleToggle}
          />
        )}
      </h4>
      {menuState && (
        <div className="w-full mt-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex flex-wrap h-[22vh] pr-8">
            {sizes.map((item) => (
              <button
                key={item}
                disabled={size === item}
                className={`flex-1 min-w-[15%] m-2 py-2 px-0 text-center text-base rounded-lg border-2 transition-all duration-300
                  ${size === item 
                    ? 'bg-gray-600 text-white border-gray-600 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-800 cursor-pointer'}`}
                onClick={() => handleSizeClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeChart;
