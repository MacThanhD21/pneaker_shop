import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PolicyPage = ({ title, children }) => {
  return (
    <PageContainer>
      <Header>
        <Title>{title}</Title>
        <Subtitle>Thông tin chi tiết về {title.toLowerCase()}</Subtitle>
      </Header>

      <ContentContainer>
        <Content>
          {children}
        </Content>

        <Sidebar>
          <QuickLinks>
            <h3>Liên kết nhanh</h3>
            <ul>
              <li><a href="#overview">Tổng quan</a></li>
              <li><a href="#process">Quy trình</a></li>
              <li><a href="#faq">Câu hỏi thường gặp</a></li>
              <li><a href="#contact">Liên hệ hỗ trợ</a></li>
            </ul>
          </QuickLinks>

          <SupportCard>
            <h3>Cần hỗ trợ?</h3>
            <p>Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
            <SupportButton href="/contact">Liên hệ ngay</SupportButton>
          </SupportCard>
        </Sidebar>
      </ContentContainer>
    </PageContainer>
  );
};

export default PolicyPage;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #fff5f5 0%, #ffe6e6 100%);
  border-radius: 15px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #db7093;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h2 {
    color: #db7093;
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    
    li {
      color: #666;
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const QuickLinks = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    color: #db7093;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #666;
        text-decoration: none;
        transition: color 0.3s;
        display: flex;
        align-items: center;
        
        &:hover {
          color: #db7093;
        }
        
        &::before {
          content: '•';
          color: #db7093;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

const SupportCard = styled.div`
  background: linear-gradient(135deg, #db7093 0%, #e75480 100%);
  padding: 1.5rem;
  border-radius: 15px;
  color: white;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }
`;

const SupportButton = styled.a`
  display: inline-block;
  background: white;
  color: #db7093;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`; 