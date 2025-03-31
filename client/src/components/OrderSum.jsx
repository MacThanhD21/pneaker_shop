import React from 'react';
import styled from 'styled-components';
import Loading from '../assets/mui/Loading';
import { Link } from 'react-router-dom';
import { formatVNDPrice } from '../utils/formatPrice';

const OrderSum = ({ cartProducts, loading, link, onClick, orderPage}) => {
  const deliveryTax = cartProducts?.length > 0 ? 10000 : 0;
  const salesTax = cartProducts?.length > 0 ? 20000 : 0;

  const originalPriceCalculated = cartProducts?.reduce(
    (acc, val) => Number(acc) + Number(val.productPrice),
    [0]
  );

  const totalPriceCalculated =
    originalPriceCalculated &&
    Number(originalPriceCalculated) + Number(deliveryTax) + Number(salesTax);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <Container
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Title>Order Summary</Title>
          <Info>
            Original price
            <span>{formatVNDPrice(originalPriceCalculated)}</span>
          </Info>
          <Info>
            Items
            <span>{formatVNDPrice(originalPriceCalculated)}</span>
          </Info>
          <Info>
            Delivery<span>{formatVNDPrice(deliveryTax)}</span>
          </Info>
          <Info>
            Sales tax<span>{formatVNDPrice(salesTax)}</span>
          </Info>
          <hr />
          <TotalContainer>
            <TotalPrice>Total</TotalPrice>
            <Price>{formatVNDPrice(totalPriceCalculated)}</Price>
          </TotalContainer>
          {onClick ? (
            <Link to= {link}>
              <Button onClick={onClick == true}>
                {orderPage ? 'Verify Information' : 'Proceed To Checkout'}
              </Button>
            </Link>
          ) : null}
        </Container>
      )}
    </Wrapper>
  );
};

export default OrderSum;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  hr {
    margin-top: 3rem;
    width: 100%;
    border: 2px solid var(--clr-border);
    border-top: none;
    border-left: none;
    border-right: none;
  }
`;
const Container = styled.div``;
const Title = styled.h4``;
const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 0.7rem;
  span {
    font-weight: 600;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const TotalPrice = styled.h2``;
const Price = styled.h1`
  color: var(--clr-red);
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
  background-color: var(--clr-primary);
  border-radius: 12px;
  padding: 12px;
  transition: all 0.3s;
  width: 100%;
  &:hover {
    background-color: var(--clr-primary-2);
  }
`;
