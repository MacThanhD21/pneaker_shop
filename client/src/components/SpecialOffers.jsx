import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Giảm Giá Mùa Hè",
      discount: "30%",
      description: "Áp dụng cho tất cả giày thể thao",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
      endDate: "31/08/2024",
      code: "SUMMER30"
    },
    {
      id: 2,
      title: "Flash Sale",
      discount: "50%",
      description: "Giảm giá đặc biệt cho các sản phẩm bán chạy",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
      endDate: "24/06/2024",
      code: "FLASH50"
    }
  ];

  return (
    <Section>
      <SectionTitle>Ưu Đãi Đặc Biệt</SectionTitle>
      <OfferGrid>
        {offers.map((offer) => (
          <OfferCard key={offer.id}>
            <OfferImage src={offer.image} alt={offer.title} />
            <OfferInfo>
              <DiscountBadge>-{offer.discount}</DiscountBadge>
              <OfferTitle>{offer.title}</OfferTitle>
              <OfferDescription>{offer.description}</OfferDescription>
              <OfferDetails>
                <DetailItem>
                  <DetailLabel>Mã Giảm Giá:</DetailLabel>
                  <DetailValue>{offer.code}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Hết Hạn:</DetailLabel>
                  <DetailValue>{offer.endDate}</DetailValue>
                </DetailItem>
              </OfferDetails>
              <StyledLink to="/shop">
                <Button>Mua Ngay</Button>
              </StyledLink>
            </OfferInfo>
          </OfferCard>
        ))}
      </OfferGrid>
    </Section>
  );
};

export default SpecialOffers;

const Section = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #db7093;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(219, 112, 147, 0.2);
`;

const OfferGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const OfferCard = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const OfferImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${OfferCard}:hover & {
    transform: scale(1.05);
  }
`;

const OfferInfo = styled.div`
  padding: 1.5rem;
  background: white;
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(45deg, #db7093, #e75480);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(219, 112, 147, 0.3);
`;

const OfferTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0.5rem 0;
`;

const OfferDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const OfferDetails = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(219, 112, 147, 0.1);
  border-radius: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  color: #db7093;
  font-weight: bold;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #db7093, #e75480);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(219, 112, 147, 0.3);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`; 