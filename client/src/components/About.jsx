import React from 'react';
import styled from 'styled-components';
import logo from '../assets/items/adidas_yeezy_700_wave_runner.png';
import image from '../assets/items/nike_jordan_1_travis_mocha_high.png';
import { mobile } from '../responsive';
const About = () => {
  return (
    <Wrapper>
      <AboutContainer>
        <Title>
          <Logo src={logo} />
          About Pneaker Shop
        </Title>
        <Info>
          <p>
            Chúng tôi tự hào mang đến những mẫu giày sneaker độc đáo và phong cách nhất
            từ các thương hiệu hàng đầu thế giới. Với hơn 5 năm kinh nghiệm,
            Psneaker Shop cam kết mang đến cho bạn không chỉ những đôi giày chất lượng
            mà còn là trải nghiệm mua sắm tuyệt vời nhất. Từ những thiết kế đường phố cá tính
            đến những mẫu giày thể thao cao cấp, chúng tôi có tất cả những gì bạn cần
            để thể hiện phong cách riêng của mình. Hãy để Psneaker Shop đồng hành
            cùng bạn trong mọi bước chân!
          </p>
        </Info> 
      </AboutContainer>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  display: flex;
  margin-top: 5rem;
`;
const AboutContainer = styled.div`
  ${mobile({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    textAlign: 'center',
    width: '100%',
  })}
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  color: var(--clr-primary);
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`;
const Logo = styled.img`
  width: 10%;
  min-width: 50px;
  margin-right: 1rem;
  ${mobile({ width: '30%' })}
`;

const Info = styled.div`
  padding: 24px;
  text-align: center;
  line-height: 2;
  font-size: 14px;
  color: var(--clr-gray);
  max-width: 900px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);

  /* First paragraph styling */
  p:first-of-type {
    font-size: 24px;
    font-weight: 400;
    color:rgb(255, 153, 153);
    margin-bottom: 20px;
  }

  /* Hover effect */
  &:hover {
    transform: translateY(-6px);
    transition: transform 0.3s ease;
  }

  /* Mobile responsiveness */
  ${mobile({
    margin: '1rem',
    padding: '20px',
    fontSize: '16px'
  })}
`;

        

const ImageContainer = styled.div`
  ${mobile({ display: 'none' })}
`;
const Image = styled.img`
  height: 50vh;
  width: 35vw;
  object-fit: cover;
`;
