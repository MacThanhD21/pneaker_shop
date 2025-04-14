import React, { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Stars = ({ stars, condition, getUserRates, createReview, userRates }) => {
  const onClick = (index) => {
    getUserRates(index);
  };

  useEffect(() => {
    if (userRates > 0) {
      createReview();
    }
  }, [createReview, userRates]);

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span
        key={index}
        onClick={() => condition && onClick(index)}
        className={`cursor-pointer transition-colors duration-200 ${
          condition 
            ? 'hover:text-yellow-600' 
            : 'hover:text-yellow-500'
        }`}
      >
        {stars > number ? (
          <StarIcon className="text-yellow-500" />
        ) : stars > index ? (
          <StarHalfIcon className="text-yellow-500" />
        ) : (
          <StarOutlineIcon className="text-yellow-500" />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center font-medium text-yellow-500">
      {tempStars}
      <span className="text-gray-400 ml-2.5">
        {stars?.toFixed(1)}
      </span>
    </div>
  );
};

export default Stars;
