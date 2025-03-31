import React from 'react';
import styled from 'styled-components';
import logo from '../assets/items/unnamed.png';
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Wrapper>
      <Image src={logo} />
      <Title>
        <StyledLink to='/'>
          <LogoText>PSneaker</LogoText>
        </StyledLink>
      </Title>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 20%;
  min-width: 245px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  background: linear-gradient(45deg, #db7093, #e75480);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(219, 112, 147, 0.2);
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
  line-height: 1;

  &:hover {
    transform: scale(1.05);
    text-shadow: 3px 3px 6px rgba(219, 112, 147, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #db7093, #e75480);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;  

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;
