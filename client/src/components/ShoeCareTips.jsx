import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tips } from '../data/shoeCareTips';

const ShoeCareTips = () => {
  const [displayedTips, setDisplayedTips] = useState([]);
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Lưu vị trí cuộn khi rời khỏi trang
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Khôi phục vị trí cuộn khi quay lại
  useEffect(() => {
    if (location.state?.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);

  useEffect(() => {
    const updateTips = () => {
      // Tạo một bản sao của mảng tips
      const shuffledTips = [...tips];
      // Xáo trộn thứ tự các tips
      for (let i = shuffledTips.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTips[i], shuffledTips[j]] = [shuffledTips[j], shuffledTips[i]];
      }
      // Chỉ lấy 5 tips đầu tiên
      setDisplayedTips(shuffledTips.slice(0, 4));
    };

    // Cập nhật ngay khi component mount
    updateTips();

    // Đặt interval để cập nhật mỗi 5 phút
    const interval = setInterval(updateTips, 5 * 60 * 1000);

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <SectionTitle>Bí Quyết Chăm Sóc Giày</SectionTitle>
      <TipsGrid>
        {displayedTips.map((tip) => (
          <TipCard
            key={tip.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={tip.path} 
              state={{ scrollPosition: window.scrollY }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <TipIcon>{tip.icon}</TipIcon>
              <TipTitle>{tip.title}</TipTitle>
              <TipDescription>{tip.description}</TipDescription>
              <LearnMore>Xem chi tiết →</LearnMore>
            </Link>
          </TipCard>
        ))}
      </TipsGrid>
    </Section>
  );
};

export default ShoeCareTips;

const Section = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #db7093;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(219, 112, 147, 0.2);
`;

const UpdateInfo = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 3rem;
  font-style: italic;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TipCard = styled.div`
  background: linear-gradient(135deg, #fff5f5, #ffe4e1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.3);
  }
`;

const TipIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const TipTitle = styled.h3`
  color: #db7093;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const TipDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0 0 1rem 0;
`;

const LearnMore = styled.span`
  color: #db7093;
  font-weight: 600;
  display: inline-block;
  transition: transform 0.3s ease;

  ${TipCard}:hover & {
    transform: translateX(5px);
  }
`; 