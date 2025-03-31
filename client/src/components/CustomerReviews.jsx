import React from 'react';
import styled from 'styled-components';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment: "Sản phẩm chất lượng, giao hàng nhanh!",
      date: "15/06/2024"
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      comment: "Giày rất đẹp và thoải mái khi mang.",
      date: "10/06/2024"
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "Dịch vụ chăm sóc khách hàng rất tốt!",
      date: "05/06/2024"
    }
  ];

  return (
    <Section>
      <SectionTitle>Đánh Giá Từ Khách Hàng</SectionTitle>
      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <ReviewerAvatar src={review.avatar} alt={review.name} />
              <ReviewerInfo>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewDate>{review.date}</ReviewDate>
              </ReviewerInfo>
            </ReviewHeader>
            <ReviewStars>
              {[...Array(review.rating)].map((_, index) => (
                <Star key={index}>★</Star>
              ))}
            </ReviewStars>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewGrid>
    </Section>
  );
};

export default CustomerReviews;

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(to bottom, #fff5f5, #ffe4e1);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #db7093;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(219, 112, 147, 0.2);
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewerAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 3px solid #db7093;
`;

const ReviewerInfo = styled.div`
  flex: 1;
`;

const ReviewerName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const ReviewDate = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const ReviewStars = styled.div`
  color: #ffd700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Star = styled.span`
  margin-right: 2px;
`;

const ReviewText = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
`; 