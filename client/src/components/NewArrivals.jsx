import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const newProducts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: "2,500,000đ",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
      category: "Running"
    },
    {
      id: 2,
      name: "Adidas Superstar",
      price: "1,800,000đ",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
      category: "Casual"
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: "2,200,000đ",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3",
      category: "Lifestyle"
    },
    {
      id: 4,
      name: "New Balance 574",
      price: "1,900,000đ",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
      category: "Casual"
    }
  ];

  return (
    <Section>
      <SectionTitle>Sản Phẩm Mới</SectionTitle>
      <ProductGrid>
        {newProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}</ProductPrice>
              <StyledLink to={`/product/${product.id}`}>
                <Button>Xem Chi Tiết</Button>
              </StyledLink>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Section>
  );
};

export default NewArrivals;

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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductCategory = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(219, 112, 147, 0.1);
  color: #db7093;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1.3rem;
  color: #db7093;
  font-weight: bold;
  margin: 0.5rem 0;
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