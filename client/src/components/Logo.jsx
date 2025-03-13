import React from 'react';
import styled from 'styled-components';
import logo from '../assets/items/unnamed.png';
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Wrapper>
      <Image src={logo} />
      <Title>
        <StyledLink to='/'>PSneaker</StyledLink>
      </Title>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  min-width: 245px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

const StyledLink = styled(Link)`
  color: red; /* Change the color to red */
  font-size: 2rem; /* Increase the font size */
  font-weight: bold; /* Make the text bold */
  text-transform: uppercase; /* Transform text to uppercase */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Add a subtle text shadow */
  text-decoration: none; /* Remove underline from link */
`;
const Image = styled.img`
  width: 7%;
  min-width: 100px;
`;
