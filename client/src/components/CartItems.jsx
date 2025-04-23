import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Stars from './Stars';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import { useSelector } from 'react-redux';
import { DELETE_FROM_CART } from '../graphql/Mutations/cartMutations';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import MuiError from '../assets/mui/Alert';
import { formatVNDPrice } from '../utils/formatPrice';

const CartItems = ({ productId, size, id, orderPage, historyPage, isSelected, onSelect, onDisableCheckbox }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { userInfo } = useSelector((state) => state.user);

  const { loading } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
    onCompleted({ getProductById }) {
      setCartItems(getProductById);
    },
  });

  const [deleteProduct, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_FROM_CART, {
      variables: { id },
      refetchQueries: [
        {
          query: GET_USER_CART,
          variables: { userId: userInfo.id },
          awaitRefetchQueries: true,
        },
      ],
    });

  const { image, title, model, price } = cartItems;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading || deleteLoading) return <Loading />;
  if (deleteError) return <MuiError type='error' value={'Something went wrong.. Please try again later'} />;

  return (
    <div className="mb-4">
      <div className="flex bg-white w-full rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex w-full items-center p-4">
          {!onDisableCheckbox && (
            <div className="flex items-center px-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                id={`item-${id}`}
                className="w-4 h-4 cursor-pointer accent-primary-500"
              />
            </div>
          )}
          
          <div className="mr-4">
            <img 
              src={image} 
              alt={title}
              className="w-24 h-24 md:w-24 md:h-24 object-cover rounded"
            />
          </div>

          <div className="flex-1 mr-4">
            <h4 className="text-base text-gray-900 font-medium">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{model}</p>
            <div className="flex gap-4 mt-2">
              <p className="text-sm text-gray-900">Size: {size}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 h-8 text-center border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-end gap-2">
              {!orderPage && (
                <ClearIcon
                  className="text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full p-1 cursor-pointer transition-colors duration-300"
                  onClick={() => deleteProduct()}
                />
              )}
              <h2 className="text-lg text-primary-500 font-semibold">
                {formatVNDPrice(price * quantity)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
