import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../services/recommendationService';
import { useApolloClient } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RecommendedContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to right, #fff5f5, #fff);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(31, 38, 135, 0.08);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled(Link)`
  background: #fff;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s;
  text-decoration: none;
  color: inherit;
  position: relative;
  border: 1.5px solid #f3f4f6;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 16px 40px 0 rgba(31, 38, 135, 0.22);
    border-color: #fb7185;
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #fff0f6 0%, #fce4ec 100%);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(.4,2,.6,1);
  ${ProductCard}:hover & {
    transform: scale(1.08) rotate(-2deg);
    filter: brightness(0.95) contrast(1.1);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background: #fb7185;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(251, 113, 133, 0.15);
  letter-spacing: 1px;
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 1.25rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  color: #22223b;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
  min-height: 2.2em;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: #fb7185;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  text-align: center;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

const RecommendedProducts = ({ itemId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations(itemId);
        const ids = Array.isArray(data.similar_item_ids) ? data.similar_item_ids : [];
        if (ids.length > 0) {
          const productResults = await Promise.all(
            ids.map(id =>
              client
                .query({
                  query: GET_SINGLE_PRODUCT,
                  variables: { productId: id },
                  fetchPolicy: 'network-only'
                })
                .then(res => res.data?.getProductById)
                .catch(() => null)
            )
          );
          setProducts(productResults.filter(Boolean));
        } else {
          setProducts([]);
        }
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm gợi ý. Vui lòng thử lại sau.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchRecommendations();
    }
  }, [itemId, client]);

  if (loading) {
    return (
      <RecommendedContainer>
        <Title>Sản Phẩm Tương Tự</Title>
        <LoadingSpinner>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </LoadingSpinner>
      </RecommendedContainer>
    );
  }

  if (error) {
    return (
      <RecommendedContainer>
        <Title>Sản Phẩm Tương Tự</Title>
        <ErrorMessage>{error}</ErrorMessage>
      </RecommendedContainer>
    );
  }

  return (
    <RecommendedContainer>
      <Title>Sản Phẩm Tương Tự</Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} to={`/shop/${product.id}`}>
            <ProductImageWrapper>
              <ProductImage src={product.image} alt={product.title} />
              <Badge>Gợi ý</Badge>
            </ProductImageWrapper>
            <ProductInfo>
              <ProductName>{product.title}</ProductName>
              <ProductPrice>
                {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ để biết giá'}
              </ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </RecommendedContainer>
  );
};

export default RecommendedProducts; 