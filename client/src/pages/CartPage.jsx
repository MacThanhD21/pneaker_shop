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
        setSelectedItems(cartProducts.map(item => item.id));
      } catch (error) {
        console.error('Error updating cart items selection:', error);
      }
    } else {
      try {
        await updateCartItemsSelection({
          variables: {
            cartProductIds: cartProducts.map(item => item.id),
            selected: false,
          }
        });
        setSelectedItems([]);
      } catch (error) {
        console.error('Error updating cart items selection:', error);
      }
    }
  };

  // Handle individual item selection
  const handleSelectItem = async (itemId) => {
    try {
      setSelectedItems(prev => {
        if (isCurrentlySelected) {
          return prev.filter(id => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      });
      const isCurrentlySelected = selectedItems.includes(itemId);
      await updateCartItemsSelection({
        variables: {
          cartProductIds: [itemId],
          selected: !isCurrentlySelected,
        }
      });
      
     
    } catch (error) {
      console.error('Error updating cart items selection:', error);
    }
  };

  return (
    <div className='section-center'>
      <Navbar />
      <Wrapper>
        {loading ? (
          <Loading />
        ) : !cartLength ? (
          <EmptyCartContainer>
            <EmptyCartMessage>
              Chưa có sản phẩm nào trong giỏ hàng
            </EmptyCartMessage>
            <StyledLink to='/shop'>
              <ShopButton>
                QUAY TRỞ LẠI CỬA HÀNG
              </ShopButton>
            </StyledLink>
          </EmptyCartContainer>
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
                    onDisableCheckbox={false}
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
  min-height: 70vh;
  justify-content: center;
  align-items: center;
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

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  min-height: 300px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #fff5f5, #fff);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const EmptyCartMessage = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ShopButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(45deg, #db7093, #e75480);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.3);
    background: linear-gradient(45deg, #e75480, #db7093);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  }
`;