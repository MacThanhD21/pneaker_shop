import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { toggleMobileMenu } from '../features/filterSlice';
import { Logo, SearchBar } from './';
import { Link } from 'react-router-dom';
import { useLogout } from '../utils/customHooks';

const MoblieMenu = () => {
  const { mobileMenu } = useSelector((state) => state.filter);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { handleLogout } = useLogout();

  const logoutHandler = () => {
    handleLogout();
    dispatch(toggleMobileMenu());
  };

  // eslint-disable-next-line
  const display = new Boolean();

  return (
    <>
      {mobileMenu && (
        <div className="fixed inset-0 z-50 h-screen w-full bg-white overflow-x-hidden flex flex-col md:hidden">
          {/* Header */}
          <div className="w-[90%] flex justify-between items-center mx-5 mb-10 border-b-2 border-gray-200">
            <Logo />
            <CloseIcon
              className="text-red-500 text-3xl cursor-pointer hover:text-red-600 transition-colors"
              onClick={() => dispatch(toggleMobileMenu())}
            />
          </div>

          {/* Search Bar */}
          <div className="px-4 mb-6">
            <SearchBar display={display} />
          </div>

          {/* Main Links */}
          <div className="w-full px-4 space-y-2">
            <Link
              onClick={() => dispatch(toggleMobileMenu())}
              to="/"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              onClick={() => dispatch(toggleMobileMenu())}
              to="/shop"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Shop
            </Link>
            {userInfo && (
              <Link
                onClick={() => dispatch(toggleMobileMenu())}
                to="/profile"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Profile
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <Link
                onClick={() => dispatch(toggleMobileMenu())}
                to="/new-item"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* User Links */}
          <div className="mt-auto px-4 py-6 space-y-4">
            {userInfo ? (
              <Link
                onClick={logoutHandler}
                to="/"
                className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <PersonOutlineOutlinedIcon className="mr-2" />
                Sign Out
              </Link>
            ) : (
              <Link
                onClick={() => dispatch(toggleMobileMenu())}
                to="/login"
                className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <PersonOutlineOutlinedIcon className="mr-2" />
                Sign in
              </Link>
            )}
            {userInfo && (
              <Link
                onClick={() => dispatch(toggleMobileMenu())}
                to="/cart"
                className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <ShoppingCartOutlinedIcon className="mr-2" />
                Cart
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MoblieMenu;
