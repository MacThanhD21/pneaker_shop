import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loading from '../assets/mui/Loading';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';

import { Navbar, OrderSum, TopPicks } from '../components';
import CartItems from '../components/CartItems';
import MuiError from '../assets/mui/Alert';
import { mobile } from '../responsive';
import { UPDATE_CART_ITEMS_SELECTION } from '../graphql/Mutations/cartMutations';

const CartPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { loading, data, error } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });
  const cartProducts = data?.getUserCart.cartProducts;
  console.log(cartProducts);
  const cartLength = cartProducts?.length;

  const [updateCartItemsSelection] = useMutation(UPDATE_CART_ITEMS_SELECTION, {
    refetchQueries: [{ query: GET_USER_CART }],
  });


  // Add state for selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle select all
  const handleSelectAll = async(e) => {
    if (e.target.checked) {
      try {
        await updateCartItemsSelection({
          variables: {
            cartProductIds: cartProducts.map(item => item.id),
            selected: true,
          }
        });
      } catch (error) {
        console.error('Error updating cart items selection:', error);
      }
      setSelectedItems(cartProducts.map(item => item.id));
    } else {
      try {
        await updateCartItemsSelection({
          variables: {
            cartProductIds: cartProducts.map(item => item.id),
            selected: false,
          }
        });
      } catch (error) {
        console.error('Error updating cart items selection:', error);
      }
      setSelectedItems([]);
    }
  };

  // Handle individual item selection
  const handleSelectItem = async (itemId) => {
    setSelectedItems(async (prev) => {
      if (prev.includes(itemId)) {
        try {
          await updateCartItemsSelection({
            variables: {
              cartProductIds: [itemId],
              selected: false,
            }
          });
        } catch (error) {
          console.error('Error updating cart items selection:', error);
        }
        return prev.filter(id => id !== itemId);
      } else {
        try {
          await updateCartItemsSelection({
            variables: {
              cartProductIds: [itemId],
              selected: true,
            }
          });
        } catch (error) {
          console.error('Error updating cart items selection:', error);
        }
        return [...prev, itemId];
      }
    });
  };

  return (
    <div className='section-center'>
      <Navbar />
      <Wrapper>
        {loading ? (
          <Loading />
        ) : !cartLength ? (
          <MuiError fontSize={'25px'} type='warning' className='warning'>
            Your cart is empty,
            <Link
              style={{ textDecoration: 'underline', margin: '0.2rem' }}
              to='/shop'
            >
              Fill it
            </Link>
          </MuiError>
        ) : error ? (
          <MuiError
            type='error'
            value={'Something went wrong.. Try again later.'}
          />
        ) : (
          <div className='container'>
            <Container>
              <Header>
                <Title>Your bag</Title>
                <SelectAllContainer>
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cartProducts.length}
                    onChange={handleSelectAll}
                    id="selectAll"
                    defaultChecked={false}
                  />
                  <label htmlFor="selectAll">Select All</label>
                  <span style={{ color: 'var(--clr-gray)', marginLeft: '1rem' }}>
                    Selected: <TotalItems>{selectedItems.length} items </TotalItems>
                  </span>
                </SelectAllContainer>
              </Header>
              <CartItemsContainer>
                {cartProducts?.map((cartItem, index) => (
                  <CartItems 
                    key={index} 
                    {...cartItem}
                    isSelected={selectedItems.includes(cartItem.id)}
                    onSelect={() => handleSelectItem(cartItem.id)}
                  />
                ))}
              </CartItemsContainer>
            </Container>
            <OrderSummary>
              <OrderSum 
                cartProducts={cartProducts?.filter(item => selectedItems.includes(item.id))} 
                loading={loading} 
                onClick 
                link='/order'
                selectedItemsCount={selectedItems.length}
              />
            </OrderSummary>
          </div>
        )}
      </Wrapper>

      <hr className='hr' />
      <TopPicks cartPage />
    </div>
  );
};

export default CartPage;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .container {
    display: flex;
    width: 100%;
    ${mobile({
      display: 'flex',
      flexDirection: 'column',
    })}
  }
`;

const Header = styled.div``;
const Title = styled.h2`
  color: var(--clr-primary);
  font-size: 30px;
`;
const TotalItems = styled.span`
  font-weight: 500;
  color: black;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
  // margin-top: 1rem;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  ${mobile({
    margin: '0 auto',
    padding: '0',
  })}
`;

const OrderSummary = styled.div`
  display: flex;
  width: 45%;
  align-items: center;
  padding: 3rem;
  ${mobile({
    display: 'flex',
    padding: '0',
    justifyContent: 'center',
    width: '100%',
  })}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

// Add these new styled components
const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    cursor: pointer;
    user-select: none;
  }
`;