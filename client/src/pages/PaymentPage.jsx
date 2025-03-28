import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MuiError from '../assets/mui/Alert';
import Loading from '../assets/mui/Loading';
import { Navbar, OrderSum } from '../components';
import { mobile } from '../responsive';

import { CREATE_ORDER } from '../graphql/Mutations/orderMutation';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { GET_USER_ORDER } from '../graphql/Queries/orderQueries';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import StripeContainer from '../components/StripeContainer';
import PaymenStripeForm from '../components/StripePaymentForm';

// Payment Type Selector Component
const PaymentTypeSelector = ({ cartProducts }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState(0);
  const deliveryTax = 10000;
  const salesTax = 20000;

  const originalPriceCalculated = cartProducts?.reduce(
    (acc, val) => Number(acc) + Number(val.productPrice),
    [0]
  );
  const totalPriceCalculated =
    originalPriceCalculated &&
    Number(originalPriceCalculated) + Number(deliveryTax) + Number(salesTax);

  const paymentTypes = [
    {
      id: 'stripe',
      name: 'Stripe',
      logo: '💳',
      description: 'Pay with Stripe - secure international payments',
      fields: ['Card Number', 'Expiry Date', 'CVC']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: '💰',
      description: 'Pay with PayPal - fast and secure online payments',
      fields: ['Email', 'Password']
    }
  ];

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(selectedPayment === paymentId ? null : paymentId);
  };

  return (
    <PaymentContainer>
      <PaymentHeading>Select Payment Method</PaymentHeading>
      
      <PaymentList>
        {paymentTypes.map((payment) => (
          <PaymentItem key={payment.id}>
            <PaymentButton
              onClick={() => handlePaymentSelect(payment.id)}
            >
              <PaymentLogo>{payment.logo}</PaymentLogo>
              <PaymentName>{payment.name}</PaymentName>
              <ArrowIcon rotated={selectedPayment === payment.id}>
                <svg 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </ArrowIcon>
            </PaymentButton>
            
            {
              selectedPayment === payment.id && payment.id === 'stripe' && (
                <ExpandedContent>
                  <StripeContainer>
                    <PaymenStripeForm amount={totalPriceCalculated} />
                  </StripeContainer>
                </ExpandedContent>
              )
              // selectedPayment === payment.id && payment.id === 'paypal' && (
              //   <ExpandedContent>
              //     <PaymentDescription>{payment.description}</PaymentDescription>
              //   </ExpandedContent>
              // )
            }
          </PaymentItem>
        ))}
      </PaymentList>
    </PaymentContainer>
  );
};

const PaymentPage = () => {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });

  const cartProducts = data?.getUserCart.cartProducts.filter(item => item.selected === true);
  console.log(cartProducts);
  

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
    <div className='section-center'>
      <Navbar />
      <Wrapper>
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
          <LoadingContainer>
            <Container>
              <PaymentTypeSelector
                cartProducts={cartProducts}
               />
            </Container>
            <OrderSummary >
              <OrderSum
                cartProducts={cartProducts}
                orderPage
              />
            </OrderSummary>
          </LoadingContainer>
        )}
      </Wrapper>
    </div>
  );
};

export default PaymentPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 80vh;
  ${mobile({ flexDirection: 'column' })}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
  ${mobile({ padding: '1rem' })}
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  ${mobile({ flexDirection: 'column' })}
`;

const OrderInfo = styled.div`
  margin-top: 1rem;
`;
const Title = styled.h1`
  letter-spacing: 1px;
  color: var(--clr-primary-2);
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
  margin-top: 1rem;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  ${mobile({
  margin: '0 auto',
  padding: '0',
})}
`;

const OrderSummary = styled.div`
  display: flex;
  width: 50%;
  align-items: flex-start;
  padding: 2rem;
  flex-direction: column;
  border-left: 1px solid var(--clr-border);
  ${mobile({
    display: 'flex',
    padding: '0',
    justifyContent: 'center',
    width: '100%',
    borderLeft: 'none',
    borderTop: '1px solid var(--clr-border)',
  })}
`;
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  .shipping_link {
    padding: 1rem;
  }
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  color: white;
  border-radius: 5px;
  padding: 0.375rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 14px;
  transition: all 0.3s;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;

// New styled components for PaymentTypeSelector
const PaymentContainer = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 1rem;
`;

const PaymentHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const PaymentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PaymentItem = styled.div`
  border: 1px solid var(--clr-border);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const PaymentButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const PaymentLogo = styled.div`
  font-size: 1.5rem;
  margin-right: 0.75rem;
`;

const PaymentName = styled.div`
  font-weight: 500;
`;

const ArrowIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  transition: transform 0.2s;
  transform: ${props => props.rotated ? 'rotate(180deg)' : 'none'};
`;

const ExpandedContent = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-top: 1px solid var(--clr-border);
`;

const PaymentDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const FieldInput = styled.input`
  border: 1px solid var(--clr-border);
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;