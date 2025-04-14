import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MuiError from '../assets/mui/Alert';
import Loading from '../assets/mui/Loading';
import { Navbar, OrderSum } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_ORDER } from '../graphql/Mutations/orderMutation';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { GET_USER_ORDER } from '../graphql/Queries/orderQueries';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import StripeContainer from '../components/StripeContainer';
import PaymenStripeForm from '../components/StripePaymentForm';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from '../components/PaypalComponents';
import { formatVNDPrice } from '../utils/formatPrice';

import stripeIcon from '../assets/items/stripe.jpg';
import paypalIcon from '../assets/items/images.png';
import vnpayIcon from '../assets/items/vnpay.png';

// Payment Type Selector Component
const PaymentTypeSelector = ({ cartProducts }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState(0);
  const deliveryTax = 10000;
  const salesTax = 20000;

  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("");
  const originalPriceCalculated = cartProducts?.reduce(
    (acc, val) => Number(acc) + Number(val.productPrice),
    [0]
  );
  const totalPriceCalculated =
    originalPriceCalculated &&
    Number(originalPriceCalculated) + Number(deliveryTax) + Number(salesTax);
  const [completeOrder] = useMutation(CREATE_ORDER, {
    onCompleted() {
      navigate('/history');
    },
    refetchQueries: [
      {
        query: GET_USER_CART,
        variables: { userId: userInfo?.id },
        awaitRefetchQueries: true,
      },
      {
        query: GET_PRODUCTS,
      },
      {
        query: GET_USER_ORDER,
      }
    ]
  });

  const paymentTypes = [
    {
      id: 'stripe',
      name: 'Stripe',
      logo: <img src={stripeIcon} alt="Stripe" className="w-6 h-6" />,
      description: 'Pay with Stripe - secure international payments',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: <img src={paypalIcon} alt="PayPal" className="w-6 h-6" />,
      description: 'Pay with PayPal - fast and secure online payments',
    },
    {
      id: 'vnPay',
      name: 'VNPay',
      logo: <img src={vnpayIcon} alt="VNPay" className="w-6 h-6" />,
      description: 'Pay with VNPay - fast and secure online payments',
    }
  ];

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(selectedPayment === paymentId ? null : paymentId);
  };

  return (
    <div className="w-full max-w-[28rem] mx-auto p-3">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Payment Method</h2>

      <div className="flex flex-col gap-2">
        {paymentTypes.map((payment) => (
          <div key={payment.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white transition-all duration-200 hover:border-red-500 hover:shadow-sm">
            <button
              onClick={() => handlePaymentSelect(payment.id)}
              className="w-full flex items-center p-3 bg-transparent hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mr-3 w-5 h-5">
                {payment.logo}
              </div>
              <div className="font-medium text-gray-700">{payment.name}</div>
              <div className={`ml-auto w-4 h-4 text-gray-400 transition-transform duration-200 ${selectedPayment === payment.id ? 'rotate-180' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {selectedPayment === payment.id && payment.id === 'stripe' && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <StripeContainer>
                  <PaymenStripeForm amount={totalPriceCalculated} />
                </StripeContainer>
              </div>
            )}

            {selectedPayment === payment.id && payment.id === 'paypal' && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <PayPalScriptProvider options={{ "client-id": "Af5oZoPUQ1tTUv7sdLzxs3PGfa09k6ynefB4gqLwQtyBqNRTQ9HoJ2YEx1wvJk0JsMnWpYnBVxT4nsKD" }}>
                  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                      <h2 className="text-xl font-semibold mb-4">Pay {formatVNDPrice(totalPriceCalculated)} with Paypal</h2>
                      <PayPalButton
                        amount={totalPriceCalculated}
                        onSuccess={(details) => {
                          setPaymentStatus(`Transaction completed by ${details.payer.name.given_name}`);
                          completeOrder({});
                        }}
                        onError={(err) => {
                          setPaymentStatus("Payment failed. Please try again.");
                          console.error(err);
                        }}
                      />
                      {paymentStatus && <p className="mt-4 text-gray-600">{paymentStatus}</p>}
                    </div>
                  </div>
                </PayPalScriptProvider>
              </div>
            )}

            {selectedPayment === payment.id && payment.id === 'vnPay' && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <div 
                  onClick={() => window.location.href = 'http://localhost:8888/order/create_payment_url'}
                  className="border border-red-500 rounded-md p-3 h-12 flex justify-center items-center bg-red-500 shadow-sm hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span className="text-black font-medium tracking-wide hover:text-white">
                    Pay with VNPay
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });

  const cartProducts = data?.getUserCart.cartProducts.filter(item => item.selected === true);

  const [completeOrder, { loading: orderLoading, error: orderError }] =
    useMutation(CREATE_ORDER, {
      refetchQueries: [
        {
          query: GET_USER_CART,
          variables: { userId: userInfo?.id },
          awaitRefetchQueries: true,
        },
        {
          query: GET_PRODUCTS,
        },
        {
          query: GET_USER_ORDER,
        },
      ],
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <ToastContainer />
      <div className="flex w-full min-h-[80vh] md:flex-row flex-col">
        {loading ? (
          <Loading />
        ) : orderLoading ? (
          <Loading />
        ) : orderError ? (
          <MuiError
            type='error'
            value={'Something went wrong, Please try again later..'}
          />
        ) : (
          <div className="flex w-full md:flex-row flex-col">
            <div className="flex flex-col flex-1 p-8 md:p-4">
              <PaymentTypeSelector cartProducts={cartProducts} />
            </div>
            <div className="md:w-1/2 w-full flex flex-col items-start p-8 md:p-4 border-l border-gray-200 md:border-t-0 border-t">
              <OrderSum cartProducts={cartProducts} orderPage />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;