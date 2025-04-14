import React from 'react';
import styled from 'styled-components';
import HistoryItems from './HistoryItems';

const OrderComponent = ({ datePurchased, orderProducts, id }) => {
  const formattedDate = new Date(datePurchased).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const shortId = id.slice(-5); // Lấy 5 ký tự cuối của ID

  return (
    <>
      <Wrapper>
        <OrderTitle>🧾 Order #{shortId} - {formattedDate}</OrderTitle>
        {orderProducts.map((c, index) => {
          return (
            <HistoryItems key={index} {...c} datePurchased={datePurchased} />
          );  
        })}
      </Wrapper>
    </>
  );
};

export default OrderComponent;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--clr-white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderTitle = styled.h2`
  color: var(--clr-primary-2);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--clr-grey-8);
`;
