import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OrderComponent from '../../components/OrderComponent';
import { useQuery } from '@apollo/client';
import { GET_USER_ORDER } from '../../graphql/Queries/orderQueries';
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';
import moment from 'moment';

const PurchaseHistory = () => {
  const { loading, error, data } = useQuery(GET_USER_ORDER);
  const navigate = useNavigate();

  const orders = data?.getUserOrders || [];
  
  useEffect(() => {
    if (!loading && orders.length === 0) {
      navigate('/shop');
    }
  }, [orders, navigate, loading]);

  // Sort orders by purchase date (newest first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = moment(a.datePurchased);
    const dateB = moment(b.datePurchased);
    return dateB.diff(dateA);
  });

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <MuiError type='error' value={'Please try again later..'} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {sortedOrders.map((order, index) => (
        <OrderComponent key={index} {...order} />
      ))}
    </Wrapper>
  );
};

export default PurchaseHistory;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
`;
