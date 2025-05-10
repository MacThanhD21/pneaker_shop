import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MuiError from '../assets/mui/Alert';
import Loading from '../assets/mui/Loading';
import { Navbar, OrderSum } from '../components';
import CartItems from '../components/CartItems';
import { CREATE_ORDER } from '../graphql/Mutations/orderMutation';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { GET_USER_ORDER } from '../graphql/Queries/orderQueries';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import { validateShippingAddress } from '../utils/validators';

const OrderPage = () => {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
    skip: !userInfo?.id
  });
  const cartProducts = data?.getUserCart.cartProducts;  

  const selectedProducts = useMemo(() => 
    cartProducts?.filter(product => product.selected) || []
  , [cartProducts]);

  const { city, address, country, postalCode, phoneNumber } =
    !isLoading && userInfo?.shippingAddress;

  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;

  const { errors } = validateShippingAddress(
    city,
    address,
    country,
    postalCode,
    phoneNumber
  );
  const errorsLength = Object.keys(errors).length;

  const [{ loading: orderLoading, error: orderError }] =
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

  useEffect(() => {
    if (!loading && selectedProducts.length < 1) {
      navigate('/cart');
    }
  }, [selectedProducts, navigate, loading]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="flex flex-wrap w-full min-h-[80vh] px-6 mt-4">
        {loading ? (
          <Loading />
        ) : orderLoading ? (
          <Loading />
        ) : orderError ? (
          <MuiError
            type='error'
            value={'Something went wrong, Please try again later..'}
          />
        ) : errorsLength > 0 ? (
          <div className="flex flex-col">
            <MuiError type='error'>{errors.general}</MuiError>
            <Link className="p-4" to='/shipping'>
              <button className="bg-red-500 text-white rounded-md px-4 py-2 text-sm uppercase tracking-wider transition-colors duration-300 hover:bg-red-600 border border-black">
                Go to profile
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex w-full gap-4 md:flex-row flex-col">
            <div className="flex flex-col flex-1 bg-white rounded-xl shadow-md p-4 mb-4">
              <div className="bg-red-500 text-white rounded-t-xl p-4">
                <h1 className="text-xl font-semibold">Thông tin đơn hàng</h1>
                <p className="text-sm opacity-90 mt-1">
                  Vui lòng kiểm tra thông tin trước khi thanh toán
                </p>
              </div>

              <div className="p-4">
                <div className="mb-6">
                  <h2 className="text-lg text-gray-700 flex items-center gap-2 mb-3">
                    <span className="text-xl">👤</span>
                    Thông tin khách hàng
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md flex flex-col gap-1">
                      <div className="text-sm text-gray-500 font-medium tracking-wide">
                        Họ và tên
                      </div>
                      <div className="text-gray-800 font-medium">
                        {firstName} {lastName}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md flex flex-col gap-1">
                      <div className="text-sm text-gray-500 font-medium tracking-wide">
                        Số điện thoại
                      </div>
                      <div className="text-gray-800 font-medium">
                        {phoneNumber}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md flex flex-col gap-1">
                      <div className="text-sm text-gray-500 font-medium tracking-wide">
                        Địa chỉ
                      </div>
                      <div className="text-gray-800 font-medium">
                        {address}, {city}, {postalCode}, {country}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg text-gray-700 flex items-center gap-2 mb-3">
                    <span className="text-xl">🛍️</span>
                    Chi tiết đơn hàng
                  </h2>
                  <div className="flex flex-col pr-2 overflow-y-auto overflow-x-hidden h-[30vh] gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {selectedProducts.map((cartItem, index) => (
                      <CartItems key={index} orderPage {...cartItem} onDisableCheckbox isShowEditQuantity={false} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex flex-col items-center p-4 bg-white rounded-xl shadow-md sticky top-6 h-fit md:ml-4">
              <OrderSum
                onClick
                cartProducts={selectedProducts}
                orderPage
                link='/payment'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
