import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollToTopButton 
      onClick={scrollToTop} 
      show={showScrollTop}
    >
      <ScrollIcon>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 4L4 12M12 4L20 12M12 4V20" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </ScrollIcon>
    </ScrollToTopButton>
  );
};

export default ScrollToTop;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    border-color: #333;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
  }

  ${mobile({
    bottom: '1.5rem',
    right: '1.5rem',
    width: '50px',
    height: '50px'
  })}
`;

const ScrollIcon = styled.span`
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  ${ScrollToTopButton}:hover svg {
    transform: translateY(-2px);
  }

  ${mobile({
    svg: {
      width: '20px',
      height: '20px'
    }
  })}
`;