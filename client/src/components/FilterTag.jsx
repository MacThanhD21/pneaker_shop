import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const FilterTag = ({ label, clearIcon, removeFilter }) => {
  return (
    <div className="inline-block">
      <div className="flex h-6 px-4 items-center bg-white rounded-lg mr-4 mb-4 text-gray-500 text-sm">
        {label}
        {clearIcon && (
          <ClearIcon 
            onClick={removeFilter} 
            className="text-xs ml-2.5 cursor-pointer transition-colors duration-300 hover:text-red-500" 
          />
        )}
      </div>
    </div>
  );
};

export default FilterTag;
