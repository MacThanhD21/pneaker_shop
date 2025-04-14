import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from '../assets/mui/UserMenu';
import { Logo, SearchBar } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { useQuery } from '@apollo/client';
import { toggleMobileMenu } from '../features/filterSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { data } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
    skip: !userInfo,
  });

  // eslint-disable-next-line
  const display = new Boolean();

  const dispatch = useDispatch();

  return (
    <>
      {/* Navbar Spacer */}
      <div className="h-24 w-full bg-transparent md:h-24"></div>
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex w-full border-b border-rose-200/50 bg-gradient-to-r from-rose-50 to-rose-100/50 px-4 py-2 shadow-sm md:mb-4 md:px-8">
        {/* Logo Section */}
        <div className="flex w-1/6 items-center justify-start">
          <Logo />
        </div>
        
        {/* Link Container - Hidden on mobile */}
        <div className="hidden w-1/4 flex-row items-center justify-center gap-4 md:flex">
          <Link 
            className="rounded px-3 py-1.5 text-base font-medium tracking-wide text-rose-800 transition-all duration-300 hover:bg-rose-200/50 hover:text-rose-800" 
            to='/'
          >
            Home
          </Link>
          <Link 
            className="rounded px-3 py-1.5 text-base font-medium tracking-wide text-rose-800 transition-all duration-300 hover:bg-rose-200/50 hover:text-rose-800" 
            to='/shop'
          >
            Shop
          </Link>
        </div>
        
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden w-2/5 items-center justify-center md:flex">
          <SearchBar display={display} />
        </div>

        {/* User Container - Hidden on mobile */}
        <div className="hidden w-1/4 flex-row items-center justify-end gap-4 md:flex">
          {userInfo ? (
            <UserMenu />
          ) : (
            <Link to='/login' className="flex items-center gap-2 rounded px-3 py-1.5 text-base font-medium tracking-wide text-rose-800 transition-all duration-300 hover:bg-rose-200/50">
              <PersonOutlineOutlinedIcon style={{ fontSize: '24px' }} />
              Sign in
            </Link>
          )}
          
          {userInfo && (
            <Link to='/cart' className="flex items-center gap-2 rounded px-3 py-1.5 text-base font-medium tracking-wide text-rose-800 transition-all duration-300 hover:bg-rose-200/50">
              <Badge
                sx={{ color: 'var(--clr-mocha)' }}
                color='primary'
                badgeContent={data?.getUserCart.cartProducts.length || 0}
              >
                <ShoppingCartOutlinedIcon style={{ fontSize: '24px' }} />
              </Badge>
              Cart
            </Link>
          )}
        </div>
        
        {/* Mobile Menu - Shown only on mobile */}
        <div className="flex w-5/6 items-center justify-end md:hidden">
          <MenuIcon
            onClick={() => dispatch(toggleMobileMenu())}
            style={{ cursor: 'pointer', fontSize: '32px', color: 'var(--clr-mocha)' }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;