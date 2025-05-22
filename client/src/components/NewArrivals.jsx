import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import { GET_USER_DETAILS } from '../graphql/Queries/userQueries';
import { getUserRecommendations } from '../services/recommendationService';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const client = useApolloClient();
  
  // Lấy thông tin user từ GraphQL
  const { data: userData, loading: userLoading } = useQuery(GET_USER_DETAILS, {
    fetchPolicy: 'network-only'
  });
  
  const user = userData?.getUserById || null;
  
  console.log('User Data:', userData);
  console.log('User:', user);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        // Kiểm tra user và user.id
        if (!user || !user.id) {
          console.log('No user or user.id found');
          setProducts([]);
          setLoading(false);
          return;
        }

        console.log('Fetching recommendations for user:', user.id);
        const data = await getUserRecommendations(user.id);
        console.log('Recommendations data:', data);
        
        const ids = Array.isArray(data.item_ids) ? data.item_ids : [];
        console.log('Recommended item IDs:', ids);
        
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
                .catch(err => {
                  console.error(`Error fetching product ${id}:`, err);
                  return null;
                })
            )
          );
          const validProducts = productResults.filter(Boolean);
          console.log('Fetched products:', validProducts);
          setProducts(validProducts);
        } else {
          console.log('No recommended products found');
          setProducts([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Không thể tải danh sách sản phẩm gợi ý. Vui lòng thử lại sau.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchRecommendations();
    }
  }, [user, client, userLoading]);

  const visibleProducts = showAll ? products : products.slice(0, 8); // 2 hàng x 4 sản phẩm
  const hasMoreProducts = products.length > 8;

  if (loading || userLoading) return <Loading />;
  if (error) return <MuiError value={error} type='error' />;

  return (
    <Section>
      <SectionTitle>
        {user?.id ? 'Sản Phẩm Được Gợi Ý Cho Bạn' : 'Sản Phẩm Mới'}
      </SectionTitle>
      <ProductGrid>
        {visibleProducts.length > 0 ? (
          <>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.title}</ProductName>
                  <ProductPrice>{product.price.toLocaleString('vi-VN')}đ</ProductPrice>
                  <ProductDetails>
                    <ProductMeta>
                      <span>⭐ {product.rating || '4.5'}</span>
                      <span>👁️ {product.views || '0'}</span>
                    </ProductMeta>
                    <span>🛍️ {product.quantity || '0'} còn lại</span>
                  </ProductDetails>
                  <StyledLink to={`/shop/${product.id}`}>
                    <Button>Xem Chi Tiết</Button>
                  </StyledLink>
                </ProductInfo>
              </ProductCard>
            ))}
            {hasMoreProducts && (
              <ShowMoreButton onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Thu gọn' : 'Xem thêm sản phẩm'}
              </ShowMoreButton>
            )}
          </>
        ) : (
          <NoProducts>
            {user?.id 
              ? 'Chưa có sản phẩm gợi ý cho bạn. Hãy mua sắm để nhận gợi ý phù hợp!'
              : 'Đăng nhập để nhận gợi ý sản phẩm phù hợp với bạn!'}
          </NoProducts>
        )}
      </ProductGrid>
    </Section>
  );
};

export default NewArrivals;

const Section = styled.section`
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.4s ease;
  background: #f8f9fa;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 0.8rem;
  background: white;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ProductCategory = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
`;

const ProductName = styled.h3`
  font-size: 0.9rem;
  color: #2d3436;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #ff6b6b;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:before {
    content: '₫';
    font-size: 0.8rem;
    color: #ff8e8e;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #666;
  margin-top: auto;
  padding-top: 0.4rem;
  border-top: 1px solid #eee;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    background: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    background: linear-gradient(135deg, #ff8e8e, #ff6b6b);
    
    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.2);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-top: auto;
`;

const NoProducts = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 1.5rem;
  color: #666;
  font-size: 0.9rem;
  background: white;
  border-radius: 12px;
  margin: 1rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border: 1px dashed #ff6b6b;
  
  &:before {
    content: '👟';
    font-size: 1.2rem;
    display: block;
    margin-bottom: 0.4rem;
  }
`;

const ShowMoreButton = styled.button`
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem auto;
  width: 200px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    background: linear-gradient(135deg, #ff8e8e, #ff6b6b);
    
    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.2);
  }
`; 

