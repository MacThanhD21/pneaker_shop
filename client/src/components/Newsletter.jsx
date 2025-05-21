import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_NEWSLETTER } from '../graphql/Mutations/newsletterMutations';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'error', 'loading'
  const [message, setMessage] = useState('');

  const [subscribeNewsletter] = useMutation(SUBSCRIBE_NEWSLETTER, {
    onCompleted: (data) => {
      setStatus('success');
      setMessage('Đăng ký thành công! Cảm ơn bạn đã quan tâm.');
      setEmail('');
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error.message || 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Vui lòng nhập email hợp lệ');
      return;
    }

    // Set loading state
    setStatus('loading');
    setMessage('Đang xử lý...');

    try {
      await subscribeNewsletter({
        variables: { email }
      });
    } catch (error) {
      setStatus('error');
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <Section>
      <NewsletterContainer>
        <NewsletterContent>
          <NewsletterTitle>Đăng Ký Nhận Thông Báo Mới Nhất</NewsletterTitle>
          <NewsletterDescription>
            Nhận thông báo ngay khi có sản phẩm mới và các chương trình khuyến mãi hấp dẫn
          </NewsletterDescription>
          <NewsletterForm onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              loading={status === 'loading'}
            >
              {status === 'loading' ? 'Đang Xử Lý...' : 'Đăng Ký'}
            </Button>
          </NewsletterForm>
          {message && (
            <Message status={status}>
              {message}
            </Message>
          )}
        </NewsletterContent>
      </NewsletterContainer>
    </Section>
  );
};

export default Newsletter;

const Section = styled.section`
  padding: 3rem 1.5rem;
  background: #fff5f5;
  position: relative;
  overflow: hidden;
  margin: 2rem 0;
  border-radius: 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(219, 112, 147, 0.05) 0%, rgba(231, 84, 128, 0.1) 100%);
    pointer-events: none;
    border-radius: 20px;
  }
`;

const NewsletterContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NewsletterContent = styled.div`
  text-align: center;
  color: #db7093;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsletterTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #db7093;
  text-shadow: 2px 2px 4px rgba(219, 112, 147, 0.1);
  font-weight: 600;
  letter-spacing: 1px;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 1rem auto 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 7px;
  font-size: 0.95rem;
  outline: none;
  background: white;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.1);
  transition: all 0.3s ease;

  &::placeholder {
    color: #db7093;
    opacity: 0.6;
  }

  &:focus {
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.15);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.9);
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 7px;
  background: linear-gradient(45deg, #db7093, #e75480);
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.3);
    background: linear-gradient(45deg, #e75480, #db7093);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background: linear-gradient(45deg, #db7093, #e75480);
  }

  ${props => props.loading && `
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid white;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  `}
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 7px;
  font-size: 0.9rem;
  background: ${props => props.status === 'success' 
    ? 'rgba(219, 112, 147, 0.1)'
    : 'rgba(255, 68, 68, 0.1)'};
  color: ${props => props.status === 'success' 
    ? '#db7093'
    : '#ff4444'};
  backdrop-filter: blur(5px);
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NewsletterDescription = styled.p`
  color: #db7093;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;