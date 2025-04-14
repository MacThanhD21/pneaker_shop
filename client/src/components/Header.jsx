import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import image from '../assets/items/adidas_yeezy_700_mauve.png';
import backgroundImage from '../assets/items/sneaker.jpg';
import Chatbox from './Chatbox';
import ScrollToTop from './ScrollToTop';

const Header = () => {
  useEffect(() => {
    const container = document.querySelector('.header-container');
    if (container) {
      container.classList.add('animate');
    }
  }, []);

  return (
    <>
      <div
        className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${backgroundImage})` }}
      >
        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Step Into{' '}
                  <span className="bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">
                    Greatness
                  </span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  Elevate your style with premium sneakers that blend comfort and iconic design
                </p>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-rose-800 text-white px-6 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <span>Explore Collection</span>
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <span className="text-rose-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <span className="text-rose-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm">Authentic Products</span>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative">
              <div className="relative">
                {/* Background Blur Effect */}
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm opacity-50"
                  style={{ backgroundImage: `url(${image})` }}>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rose-500 rounded-full opacity-20 animate-pulse delay-300"></div>

                {/* Main Image Container */}
                <div className="relative backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-rose-100/40 shadow-[0_10px_35px_rgba(230,150,230,0.25)]">
                  <img
                    src={image}
                    alt="Yeezy Boost 700"
                    className="w-full h-auto object-cover brightness-110 saturate-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 via-transparent to-transparent"></div>

                  <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90">
                    <h2 className="text-3xl font-semibold text-rose-400 drop-shadow-[1px_1px_3px_rgba(230,150,230,0.5)] tracking-wide">
                      YEEZY BOOST 700
                    </h2>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbox />
      <ScrollToTop />
    </>
  );
};

export default Header;
