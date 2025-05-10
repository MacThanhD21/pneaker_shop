import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Stars = ({ stars: initialStars, condition, getUserRates, userRates }) => {
  const [currentStars, setCurrentStars] = useState(initialStars || 0);

  useEffect(() => {
    setCurrentStars(initialStars || 0);
  }, [initialStars]);

  const handleStarClick = (index) => {
    if (condition && getUserRates) {
      const newRating = index + 1;
      setCurrentStars(newRating);
      getUserRates(newRating);
    }
  };

  const renderStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span
        key={index}
        onClick={() => handleStarClick(index)}
        className={`cursor-pointer transition-colors duration-200 ${
          condition 
            ? 'hover:text-yellow-600' 
            : 'hover:text-yellow-500'
        }`}
      >
        {currentStars > number ? (
          <StarIcon className="text-yellow-500" />
        ) : currentStars > index ? (
          <StarHalfIcon className="text-yellow-500" />
        ) : (
          <StarOutlineIcon className="text-yellow-500" />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center font-medium text-yellow-500">
      {renderStars}
      <span className="text-gray-400 ml-2.5">
        {currentStars?.toFixed(1)}
      </span>
    </div>
  );
};

export default Stars;
