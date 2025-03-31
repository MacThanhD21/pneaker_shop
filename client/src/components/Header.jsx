import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import image from '../assets/items/adidas_yeezy_700_mauve.png';
import backgroundImage from '../assets/items/sneaker.jpg';
import { mobile } from '../responsive';
import Chatbox from './Chatbox';
import ScrollToTop from './ScrollToTop';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const slideUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Header = () => {
  useEffect(() => {
    const container = document.querySelector('.header-container');
    if (container) {
      container.classList.add('animate');
    }
  }, []);

  return (
    <>
      <Wrapper className="header-container">
        <Container>
          <Title>Step Into Greatness</Title>
          <Info>
            Elevate your style with premium sneakers that blend <br />
            comfort and iconic design
          </Info>
          <Link to='/shop'>
            <Button>Explore Collection</Button>
          </Link>
        </Container>

        <ImageContainer>
          <ImageTitle>
            YEEZY
            <br /> BOOST 700
          </ImageTitle>
          <ImageWrapper>
            <Image src={image} />
            <Overlay />
          </ImageWrapper>
        </ImageContainer>
      </Wrapper>
      <Chatbox />
      <ScrollToTop />
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  border-bottom: 2px solid var(--clr-border);
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    pointer-events: none;
  }

  &.animate {
    animation: ${fadeIn} 1s ease-out forwards;
  }
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${slideIn} 1s ease-out forwards;
  opacity: 0;
  animation-delay: 0.3s;

  ${mobile({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5rem',
    padding: '1rem',
    textAlign: 'center'
  })}
`;

const Title = styled.h1`
  color: var(--clr-primary);
  font-weight: 800;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -1px;
  line-height: 1.2;
  background: linear-gradient(45deg, var(--clr-primary), var(--clr-primary-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${mobile({
    fontSize: '2.5rem'
  })}
`;

const Info = styled.p`
  color: var(--clr-gray);
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
  max-width: 500px;

  ${mobile({
    fontSize: '1rem',
    maxWidth: '100%'
  })}
`;

const Button = styled.button`
  background: linear-gradient(45deg, var(--clr-primary), var(--clr-primary-2));
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 30px;
  padding: 1rem 2.5rem;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  ${mobile({
    padding: '0.8rem 2rem',
    fontSize: '1rem'
  })}
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 5rem;
  margin-bottom: 2rem;
  width: 100%;
  position: relative;
  ${mobile({ display: 'none' })}
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  transform: rotateY(180deg);
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: transparent;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  ${ImageWrapper}:hover & {
    transform: rotateY(180deg) scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const ImageTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vh;
  height: 40vh;
  position: absolute;
  transform: rotate(-90deg) translateX(50%);
  transform-origin: center;
  right: -4rem;
  top: 50%;
  z-index: 2;
  color: var(--clr-primary);
  font-weight: 800;
  font-size: 48px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, var(--clr-primary), var(--clr-primary-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  line-height: 1.2;
`;
