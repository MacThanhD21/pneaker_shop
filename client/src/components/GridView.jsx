import React from 'react';
import ProductsContainer from './ProductsContainer';

const GridView = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full px-6 max-w-7xl mx-auto
      md:grid-cols-3 md:px-4 md:gap-4
      sm:grid-cols-2 sm:px-3 sm:gap-3">
      {data &&
        data.map((product) => (
          <div key={product.id} className="flex justify-center w-full h-full">
            <ProductsContainer {...product} />
          </div>
        ))}
    </div>
  );
};

export default GridView;
