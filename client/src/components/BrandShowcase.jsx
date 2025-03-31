import React from 'react';
import styled from 'styled-components';

const BrandShowcase = () => {
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732084.png"
    },
    {
      id: 2,
      name: "Adidas",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731962.png"
    },
    {
      id: 3,
      name: "Puma",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731966.png"
    },
    {
      id: 4,
      name: "New Balance",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731964.png"
    },
    {
      id: 5,
      name: "Converse",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731965.png"
    }
  ];

  return (
    <Section>
      <SectionTitle>Thương Hiệu Hợp Tác</SectionTitle>
      <BrandGrid>
        {brands.map((brand) => (
          <BrandCard key={brand.id}>
            <BrandLogo src={brand.logo} alt={brand.name} />
            <BrandName>{brand.name}</BrandName>
          </BrandCard>
        ))}
      </BrandGrid>
    </Section>
  );
};

export default BrandShowcase;

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

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
`;

const BrandCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.2);
  }
`;

const BrandLogo = styled.img`
  width: 120px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: grayscale(100%);
  transition: all 0.3s ease;

  ${BrandCard}:hover & {
    filter: grayscale(0%);
  }
`;

const BrandName = styled.h3`
  color: #db7093;
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
`; 