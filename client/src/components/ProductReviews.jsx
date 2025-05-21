import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_PRODUCTS_REVIEWS } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const ProductReviews = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_REVIEWS);

  if (loading) return <Loading />;
  if (error) return <MuiError value={error.message} type="error" />;

  const products = data?.getProducts || [];

  return (
    <ReviewsContainer>
      <ReviewsTitle>Đánh Giá Sản Phẩm</ReviewsTitle>
      <ReviewsGrid>
        {products.map((product) => (
          <ReviewCard key={product.id}>
            <ProductName>{product.title}</ProductName>
            <RatingContainer>
              <RatingStars>
                {'⭐'.repeat(Math.round(product.rates || 0))}
              </RatingStars>
              <RatingNumber>{product.rates?.toFixed(1) || '0.0'}</RatingNumber>
            </RatingContainer>
            <ReviewsList>
              {product.reviews?.map((review, index) => (
                <ReviewItem key={index}>
                  <ReviewHeader>
                    <ReviewDate>
                      {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </ReviewDate>
                    <ReviewRating>
                      {'⭐'.repeat(review.rating)}
                    </ReviewRating>
                  </ReviewHeader>
                  <ReviewComment>{review.comment}</ReviewComment>
                  {review.imageList?.length > 0 && (
                    <ReviewImages>
                      {review.imageList.map((image, imgIndex) => (
                        <ReviewImage 
                          key={imgIndex} 
                          src={image} 
                          alt={`Review ${index + 1}`} 
                        />
                      ))}
                    </ReviewImages>
                  )}
                </ReviewItem>
              ))}
            </ReviewsList>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </ReviewsContainer>
  );
};

export default ProductReviews;

const ReviewsContainer = styled.div`
  padding: 2rem;
  background: #f8f9fa;
`;

const ReviewsTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #ff8e8e);
    border-radius: 2px;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #2d3436;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  font-size: 1.2rem;
`;

const RatingNumber = styled.span`
  font-size: 1.1rem;
  color: #ff6b6b;
  font-weight: 600;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewItem = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ReviewDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const ReviewRating = styled.div`
  font-size: 0.9rem;
`;

const ReviewComment = styled.p`
  font-size: 0.9rem;
  color: #2d3436;
  line-height: 1.4;
  margin: 0.5rem 0;
`;

const ReviewImages = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff6b6b;
    border-radius: 2px;
  }
`;

const ReviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`; 