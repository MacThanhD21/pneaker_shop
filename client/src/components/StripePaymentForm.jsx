import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import './StripePaymentForm.css';
import { useNavigate } from 'react-router-dom';
import { formatVNDPrice } from '../utils/formatPrice';
import { CREATE_ORDER } from '../graphql/Mutations/orderMutation';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import { GET_USER_ORDER } from '../graphql/Queries/orderQueries';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Get this from Stripe Dashboard






const PaymenStripeForm = ({ amount }) => {
  const stripe = useStripe();


  const { userInfo, isLoading } = useSelector((state) => state.user);
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [completeOrder, { loading: orderLoading, error: orderError }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
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
      },
    ],
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    // const serverURL = 'http://'+(process)
    const response = await fetch('http://localhost:4000/payment-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount }) 
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: "Customer Name", // Add more billing details as needed
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful");
        setError(null);
        setProcessing(false);
        toast.success('Thanh toán thành công!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
        new Promise(_ => setTimeout(300))
        await completeOrder();
        
        // toast.success('Payment successful');
        // Handle successful payment (e.g., show success message, redirect)
      }
    }
  };

  return (
    <div className="payment-form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-header">
          <h2>Payment Details</h2>
          <p>Total Amount: {formatVNDPrice(amount)}</p>
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <div className="card-input-wrapper">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#FFFFFF",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <div className="card-input-wrapper">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#FFFFFF",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>CVC</label>
            <div className="card-input-wrapper">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#FFFFFF",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || processing}
          className="submit-button"
        >
          {processing ? "Processing..." : `Pay ${formatVNDPrice(amount)}`}
        </button>
      </form>
    </div>
  );
};

export default PaymenStripeForm;
