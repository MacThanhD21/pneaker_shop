import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../assets/mui/Loading';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { Navbar, OrderSum, TopPicks } from '../components';
import CartItems from '../components/CartItems';
import MuiError from '../assets/mui/Alert';
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

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if(cartProducts){
      const initialSelected = cartProducts
        .filter(item => item.selected)
        .map(item => item.id);
      setSelectedItems(initialSelected);
    }
  }, [cartProducts]);

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

  const handleSelectItem = async (itemId) => {
    try {
      const isCurrentlySelected = selectedItems.includes(itemId);
      setSelectedItems(prev => {
        if (isCurrentlySelected) {
          return prev.filter(id => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      });
      
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading />
        ) : !cartLength ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-white/80 backdrop-blur-sm rounded-xl shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-medium text-gray-700 mb-6">
              Chưa có sản phẩm nào trong giỏ hàng
            </h2>
            <Link to='/shop' className="w-full">
              <button className="w-full py-3 px-6 bg-gradient-to-r from-rose-600 to-rose-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                QUAY TRỞ LẠI CỬA HÀNG
              </button>
            </Link>
          </div>
        ) : error ? (
          <MuiError
            type='error'
            value={'Something went wrong.. Try again later.'}
          />
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-rose-800">Giỏ hàng của bạn</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === cartProducts.length}
                        onChange={handleSelectAll}
                        id="selectAll"
                        className="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                      />
                      <label htmlFor="selectAll" className="text-gray-700">Chọn tất cả</label>
                    </div>
                    <span className="text-gray-600">
                      Đã chọn: <span className="font-semibold text-rose-800">{selectedItems.length} sản phẩm</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-rose-50">
                  {cartProducts?.map((cartItem, index) => (
                    <CartItems 
                      key={index} 
                      {...cartItem}
                      isSelected={selectedItems.includes(cartItem.id)}
                      onSelect={() => handleSelectItem(cartItem.id)}
                      onDisableCheckbox={false}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-96">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-8">
                <OrderSum 
                  cartProducts={cartProducts?.filter(item => selectedItems.includes(item.id))} 
                  loading={loading} 
                  onClick={selectedItems.length > 0} 
                  link='/order'
                  selectedItemsCount={selectedItems.length}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-rose-100 my-8"></div>
      <TopPicks cartPage />
    </div>
  );
};

export default CartPage;