import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import ChatScript from './components/ChatScript';

import {
  CartPage,
  ErrorPage,
  HomePage,
  LoginPage,
  OrderPage,
  ProductPage,
  RegisterPage,
  ShopPage,
  PaymentPage,
  AboutPage,
} from './pages';

import { ProtectedProfileRoute, ProtectedRoute } from './components';
import MobileMenu from './components/MoblieMenu';

import {
  MainLayout,
  UserProfile,
  UserShipping,
  PurchaseHistory,
} from './pages/UserDashboard';

import { AdminLayout, EditItem, NewItem } from './pages/AdminDashboard';
import { loginUser } from './features/userSlice';
import { GET_USER_DETAILS } from './graphql/Queries/userQueries';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { useLogout } from './utils/customHooks';
import ShoeCareTips from './components/ShoeCareTips';
import ShoeCareDetail from './components/ShoeCareDetail';
import { tips } from './data/shoeCareTips';

const App = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !userInfo,
  });

  const { handleLogout } = useLogout();
  const dispatch = useDispatch();

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token && jwtDecode(token)?.exp < Date.now() / 1000) {
      localStorage.removeItem('jwtToken');
      handleLogout();
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (!loading && data && data?.getUserById.id === userInfo?.id) {
      dispatch(loginUser(data?.getUserById, loading));
    }
  }, [dispatch, data, loading, userInfo?.id]);

  return (
    <>
      <ChatScript />
      <MobileMenu />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedProfileRoute>
              <MainLayout />
            </ProtectedProfileRoute>
          }
        >
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/shipping' element={<UserShipping />} />
          <Route path='/history' element={<PurchaseHistory />} />
        </Route>
        <Route
          path='/'
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path='/new-item' element={<NewItem />} />
          <Route path='/edit-item' element={<EditItem />} />
        </Route>
        <Route
          path='/order/'
          element={
            <ProtectedProfileRoute>
              <OrderPage />
            </ProtectedProfileRoute>
          }
        />
        <Route path="/shoe-care" element={<ShoeCareTips />} />
        <Route path="/shoe-care/:id" element={<ShoeCareDetail />} />
      </Routes>
    </>
  );
};

export default App;
