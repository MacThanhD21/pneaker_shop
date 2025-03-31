import React from 'react';
import styled from 'styled-components';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tips } from '../data/shoeCareTips';

const ShoeCareDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const tip = tips.find(t => t.path === `/shoe-care/${id}`);

  if (!tip) {
    return (
      <Container>
        <BackLink to="/" state={{ scrollPosition: location.state?.scrollPosition || 0 }}>Quay lại</BackLink>
        <Title>Không tìm thấy bài viết</Title>
        <ContinueShopping to="/shop">Tiếp tục mua sắm</ContinueShopping>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink to="/" state={{ scrollPosition: location.state?.scrollPosition || 0 }}>Quay lại</BackLink>
      <Header>
        <Icon>{tip.icon}</Icon>
        <Title>{tip.title}</Title>
        <Description>{tip.description}</Description>
      </Header>

      <Content>
        <StepsSection>
          <SectionTitle>Các Bước Thực Hiện</SectionTitle>
          <StepsList>
            {tip.details.steps.map((step, index) => (
              <StepItem
                key={index}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StepNumber>{index + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepText>{step.content}</StepText>
                </StepContent>
              </StepItem>
            ))}
          </StepsList>
        </StepsSection>

        <TipsSection>
          <SectionTitle>Lưu Ý Quan Trọng</SectionTitle>
          <TipsList>
            {tip.details.tips.map((tip, index) => (
              <TipItem
                key={index}
                as={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TipIcon>💡</TipIcon>
                <TipText>{tip}</TipText>
              </TipItem>
            ))}
          </TipsList>
        </TipsSection>
      </Content>
      {/* <ContinueShopping to="/shop">Tiếp tục mua sắm</ContinueShopping> */}
    </Container>
  );
};

export default ShoeCareDetail;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  min-height: 100vh;
`;

const BackLink = styled(Link)`
  position: absolute;
  left: 2rem;
  top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #db7093, #ff69b4);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.3);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  z-index: 10;

  // &::before {
  //   content: "←";
  //   font-size: 1.3rem;
  //   transition: transform 0.3s ease;
  // }

  &:hover {
    transform: translateX(-5px);
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.4);
    
    &::before {
      transform: translateX(-5px);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    left: 1rem;
    top: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Icon = styled.span`
  font-size: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #db7093;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Content = styled.div`
  display: grid;
  gap: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #db7093;
  margin-bottom: 2rem;
  text-align: center;
`;

const StepsSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.1);
`;

const StepsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fff5f5, #ffe4e1);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  background: #db7093;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: #db7093;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const StepText = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const TipsSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.1);
`;

const TipsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const TipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fff5f5, #ffe4e1);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const TipIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #db7093;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const TipText = styled.p`
  color: #666;
  margin: 0;
  font-size: 1.1rem;
`;

const ContinueShopping = styled(Link)`
  position: fixed;
  left: 2rem;
  bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  z-index: 10;

  &::after {
    content: "→";
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
    
    &::after {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    left: 1rem;
    bottom: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }
`; 