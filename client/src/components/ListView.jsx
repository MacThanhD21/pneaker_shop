import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { formatVNDPrice } from '../utils/formatPrice';

const ListView = ({ data, filteredProducts }) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {filteredProducts &&
        filteredProducts?.map((product) => {
          const { title, image, price, rates, id } = product;
          return (
            <Link 
              to={`/shop/${id}`}
              key={id}
              className="block transform transition-transform duration-300 hover:scale-[1.01]"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="flex items-center p-3">
                  <div className="w-1/6 relative overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={title}
                      className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="w-5/6 pl-4">
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-800 mb-1 line-clamp-1 group-hover:text-[var(--clr-primary)] transition-colors duration-300">
                            {title}
                          </h3>
                          
                          <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <StarIcon className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="font-medium">{rates}/5.0</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end ml-4">
                          <span className="text-red-500 text-lg font-semibold whitespace-nowrap">
                            {formatVNDPrice(price)}
                          </span>
                          
                          <button 
                            className="mt-1 flex items-center justify-center gap-1 bg-transparent border border-gray-300 rounded-lg px-3 py-1 text-sm font-semibold transition-all duration-300 hover:bg-[var(--clr-mocha-2)] hover:text-white hover:border-transparent hover:shadow-md"
                            onClick={(e) => e.preventDefault()}
                          >
                            Buy
                            <AddShoppingCartIcon className="text-[var(--clr-primary)] text-base group-hover:text-white transition-colors duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ListView;

