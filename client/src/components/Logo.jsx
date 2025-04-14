import React from 'react';
import logo from '../assets/items/unnamed.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 w-[20%] min-w-[245px]">
      <img 
        src={logo} 
        alt="PSneaker Logo"
        className="w-16 h-16 object-contain hover:scale-105 transition-transform duration-300"
      />
      <h1 className="m-0 text-2xl font-extrabold tracking-wider">
        <Link to='/' className="no-underline flex items-center">
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent 
            relative inline-block transition-all duration-300 hover:scale-105
            after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-2px] after:left-0 
            after:bg-gradient-to-r after:from-pink-500 after:to-pink-600 after:scale-x-0 
            after:origin-right after:transition-transform after:duration-300
            hover:after:scale-x-100 hover:after:origin-left">
            PSneaker
          </span>
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
