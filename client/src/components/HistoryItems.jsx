import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import Stars from './Stars';
import moment from 'moment';
import { CREATE_REVIEW } from '../graphql/Mutations/productMutation';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { useNavigate } from 'react-router-dom';
import { formatVNDPrice } from '../utils/formatPrice';

const HistoryItems = ({ productId, datePurchased, size }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [userRates, setUserRates] = useState(0);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  }, [success]);

  const getUserRates = (value) => {
    setUserRates(value + 1);
  };

  const [createReview, { error }] = useMutation(CREATE_REVIEW, {
    variables: { productId: productId, userRate: +userRates },
    onCompleted() {
      setSuccess(true);
      setUserRates(0);
    },
  });

  const { loading } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
    onCompleted({ getProductById }) {
      setHistoryItems(getProductById);
    },
  });

  const { title, image, brand, rates, price } = historyItems;

  const handleProductClick = () => {
    navigate(`/shop/${productId}`);
  };

  return (
    <div className="w-full px-4">
      <div className="flex bg-white w-full mt-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300
        sm:flex-col sm:rounded-xl">
        {/* Product Info Section */}
        <div 
          onClick={handleProductClick} 
          className="flex w-3/5 p-6 cursor-pointer hover:bg-gray-50 rounded-l-2xl transition-colors duration-300
          sm:w-full sm:rounded-l-none sm:rounded-t-xl sm:p-4"
        >
          <div className="flex-shrink-0 w-40 h-40 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden
            sm:w-32 sm:h-32">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="ml-6 flex flex-col justify-center
            sm:ml-4">
            <h4 className="text-xl font-bold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{brand}</p>
            <div className="flex items-center mt-3 space-x-4">
              <p className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">Size: {size}</p>
              <h4 className="text-lg font-bold text-red-500">
                {formatVNDPrice(price)}
              </h4>
            </div>
          </div>
        </div>

        {/* Sale Info Section */}
        <div className="flex flex-col w-2/5 p-6 border-l border-gray-100
          sm:w-full sm:border-l-0 sm:border-t sm:border-gray-100 sm:p-4">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Order Details</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 w-32">Date Purchased:</span>
              <span className="text-sm text-gray-700">
                {moment(datePurchased).format('MMMM Do YYYY, h:mm a')}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 w-32">Day:</span>
              <span className="text-sm text-gray-700">
                {moment(datePurchased).format('dddd')}
              </span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            {loading ? (
              <Loading />
            ) : error ? (
              <MuiError width='100%' type='error' value={error.message} />
            ) : success ? (
              <MuiError
                width='100%'
                type='success'
                value={'Thank you for your review!'}
              />
            ) : (
              <div className="flex items-center">
                <h3 className="text-base font-semibold text-gray-900 mr-4">Rate this product:</h3>
                <Stars
                  stars={rates}
                  condition
                  getUserRates={getUserRates}
                  createReview={createReview}
                  userRates={userRates}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItems;
