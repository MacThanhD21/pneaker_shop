import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stars from './Stars';
import { Link } from 'react-router-dom';
import { formatVNDPrice } from '../utils/formatPrice';

const ProductsContainer = ({ title, image, price, rates, id }) => {
  return (
    <div className="w-64 min-h-[420px] flex-shrink-0 mx-2">
      <div className="relative h-full bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group border border-pink-100">
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Image */}
        <Link to={`/shop/${id}`} className="block">
          <div className="bg-pink-50 rounded-xl p-4 mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
            <img 
              src={image} 
              alt={title}
              className="w-3/5 mx-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title */}
          <h3 className="text-black font-semibold text-base text-center mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 relative">
            {title}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex justify-center mb-3 text-rose-500">
          <Stars stars={rates} />
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Link to={`/shop/${id}`}>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-rose-600 transition-all duration-300">
              Buy <AddShoppingCartIcon className="text-base" />
            </button>
          </Link>
          
          <p className="text-red-600 text-lg font-bold">
            {formatVNDPrice(price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
