import React, { useState } from 'react';
import { Navbar, Stars, Footer } from '../components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ADD_TO_CART } from '../graphql/Mutations/cartMutations';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { mobile } from '../responsive';
import { formatVNDPrice } from '../utils/formatPrice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const [product, setProduct] = useState('');
  const [shoeSize, setShoeSize] = useState([]);
  const [success, setSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const userInfo = useSelector((state) => state.user.userInfo);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = userInfo && userInfo.id;

  const { loading, data, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId: id },
    pollInterval: 1000,
  });

  const { data: cart } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });

  const [cartHandle, { loading: cartLoading, error: cartError }] = useMutation(
    ADD_TO_CART,
    {
      onCompleted() {
        setShoeSize([]);
        setSuccess(true);
      },
      variables: {
        userId,
        productId: id,
        size: shoeSize,
        productPrice: data?.getProductById.price,
      },
      refetchQueries: [
        {
          query: GET_USER_CART,
          variables: { userId },
          awaitRefetchQueries: true,
        },
      ],
    }
  );

  useEffect(() => {
    if (data) {
      setProduct(data?.getProductById);
    }
  }, [data, data?.getProductById, dispatch]);

  const { image, title, price, rates, inStock, brand, model, size } = product;

  // Tạo mảng ảnh từ ảnh chính và các ảnh phụ (nếu có)
  const images = [image, ...(product.additionalImages || [])];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const filteredCartProducts = cart?.getUserCart.cartProducts.filter(
    (c) => c.productId === id
  );
  const filteredSizesFromCart = filteredCartProducts?.map((c) => +c.size);
  const matchUserId = userId === cart?.getUserCart.userId;

  const onClickHandler = () => {
    if (!userId) {
      navigate(`/login?redirect=${id}`);
    } else {
      cartHandle();
    }
  };

  // Fake data for similar products
  const similarProducts = [
    {
      id: 1,
      title: "Nike Air Max 270",
      price: 2500000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      brand: "Nike"
    },
    {
      id: 2,
      title: "Adidas Ultra Boost",
      price: 2800000,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
      brand: "Adidas"
    },
    {
      id: 3,
      title: "Puma RS-X",
      price: 1900000,
      image: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Puma"
    },
    {
      id: 4,
      title: "New Balance 574",
      price: 1600000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      brand: "New Balance"
    },
    {
      id: 5,
      title: "Converse Chuck 70",
      price: 1400000,
      image: "https://images.unsplash.com/photo-1565379793984-e65b51b33b37?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Converse"
    },
    {
      id: 6,
      title: "Nike Air Jordan 1",
      price: 3200000,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
      brand: "Nike"
    },
    {
      id: 7,
      title: "Adidas Stan Smith",
      price: 1800000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      brand: "Adidas"
    },
    {
      id: 8,
      title: "Puma Suede Classic",
      price: 1500000,
      image: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Puma"
    },
    {
      id: 9,
      title: "New Balance 997H",
      price: 2100000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      brand: "New Balance"
    },
    {
      id: 10,
      title: "Converse One Star",
      price: 1300000,
      image: "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Converse"
    }
  ];

  const handleAddToCart = async () => {
    if (!userInfo) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/login');
      return;
    }

    try {
      await cartHandle();
      
      toast.success('Đã thêm sản phẩm vào giỏ hàng!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Wrapper className='section-center'>
      <Navbar />
      <ToastContainer />
      <Link to='/shop'>
        <Button>Quay lại cửa hàng</Button>
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <MuiError type='error' value={error.message} />
      ) : (
        <>
          <ProductContainer>
            <ImageContainer>
              <Image src={images[currentImageIndex]} alt={title} />
              <DotsContainer>
                {images.map((_, index) => (
                  <Dot
                    key={index}
                    active={currentImageIndex === index}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </DotsContainer>
            </ImageContainer>
            <InfoContainer>
              <Title>{title}</Title>
              <Stars stars={rates} />
              <Price>{formatVNDPrice(price)}</Price>
              <Lorem>
                {brand} {model} - Sản phẩm được thiết kế với chất liệu cao cấp, đảm bảo độ bền và thoải mái khi sử dụng. Phù hợp cho mọi hoạt động thể thao và casual.
              </Lorem>
              <Info>
                Available:<span>{inStock ? 'Còn hàng' : 'Hết hàng'}</span>
              </Info>
              <Info>
                Brand:<span>{brand}</span>
              </Info>
              <Info>
                Model:<span>{model}</span>
              </Info>

              {inStock ? (
                <Info>
                  Sizes:
                  <SizeContainer>
                    {size?.map((size, index) => (
                      <SizeButton
                        className={shoeSize === size ? 'active' : ''}
                        onClick={() => setShoeSize(size)}
                        key={index}
                        disabled={
                          matchUserId &&
                          filteredCartProducts &&
                          filteredSizesFromCart?.includes(size)
                        }
                      >
                        {size}
                      </SizeButton>
                    ))}
                  </SizeContainer>
                </Info>
              ) : (
                ''
              )}
              <hr />
              <Button
                className={`${inStock ? '' : 'btn-disabled'}`}
                style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                disabled={cartLoading || !inStock}
                onClick={handleAddToCart}
              >
                {inStock ? 'Add to cart' : 'Out of stock'}
              </Button>

              {cartLoading ? (
                <Loading />
              ) : cartError ? (
                <MuiError type='error' width={'100%'} value={cartError.message} />
              ) : success ? (
                <MuiError type='success'>
                  Added to cart!
                  <Link
                    style={{ textDecoration: 'underline', margin: '0.5rem' }}
                    to='/cart'
                  >
                    Check it now!
                  </Link>
                </MuiError>
              ) : (
                ''
              )}
            </InfoContainer>
          </ProductContainer>

          <TabsContainer>
            <TabButton 
              active={activeTab === 'description'} 
              onClick={() => setActiveTab('description')}
            >
              Mô Tả Sản Phẩm
            </TabButton>
            <TabButton 
              active={activeTab === 'additional'} 
              onClick={() => setActiveTab('additional')}
            >
              Thông tin Bổ Sung
            </TabButton>
            <TabButton 
              active={activeTab === 'reviews'} 
              onClick={() => setActiveTab('reviews')}
            >
              Đánh Giá
            </TabButton>
          </TabsContainer>

          <TabContent>
            {activeTab === 'description' && (
              <DescriptionContent>
                <h3>Mô tả chi tiết sản phẩm</h3>
                <p>Đây là phần mô tả chi tiết về sản phẩm {title}. Sản phẩm được thiết kế với chất liệu cao cấp, 
                đảm bảo độ bền và thoải mái khi sử dụng. Phù hợp cho mọi hoạt động thể thao và casual.</p>
              </DescriptionContent>
            )}
            {activeTab === 'additional' && (
              <AdditionalContent>
                <h3>Thông tin bổ sung</h3>
                <ul>
                  <li>Chất liệu: Da tổng hợp cao cấp</li>
                  <li>Đế: Cao su đúc nguyên khối</li>
                  <li>Bảo hành: 12 tháng</li>
                  <li>Xuất xứ: Việt Nam</li>
                </ul>
              </AdditionalContent>
            )}
            {activeTab === 'reviews' && (
              <ReviewsContent>
                <h3>Đánh giá sản phẩm</h3>
                <div className="review-item">
                  <Stars stars={4} />
                  <p>Nguyễn Văn A - 2 ngày trước</p>
                  <p>Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh chóng.</p>
                </div>
              </ReviewsContent>
            )}
          </TabContent>

          <SimilarProductsSection>
            <h2>Sản phẩm tương tự</h2>
            <SimilarProductsGrid>
              {similarProducts.map((product) => (
                <SimilarProductCard key={product.id}>
                  <SimilarProductImage src={product.image} alt={product.title} />
                  <SimilarProductInfo>
                    <h4>{product.title}</h4>
                    <p>{product.brand}</p>
                    <p>{formatVNDPrice(product.price)}</p>
                  </SimilarProductInfo>
                </SimilarProductCard>
              ))}
            </SimilarProductsGrid>
          </SimilarProductsSection>

          <Footer />
        </>
      )}
    </Wrapper>
  );
};

export default ProductPage;

const Wrapper = styled.div`
  min-height: 105vh;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .btn-disabled {
    background-color: #666565;
    &:hover {
      background-color: #666565;
    }
  }
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  color: white;
  border-radius: 5px;
  padding: 0.375rem 0.75rem;
  margin-top: 3rem;
  letter-spacing: 1.5px;
  font-size: 14px;
  transition: all 0.3s;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;

const ImageContainer = styled.div`
  flex: 2;
  position: relative;
`;

const Image = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease;
  ${mobile({ 
    width: '350px',
    height: '350px'
  })}
`;

const InfoContainer = styled.div`
  flex: 2;
  .active {
    border: 1px solid black;
  }
`;
const Title = styled.h1`
  color: var(--clr-primary);
  font-size: 36px;
  ${mobile({ fontSize: '24px' })}
`;

const Price = styled.p`
  color: var(--clr-mocha-2);
  font-size: 22px;
`;

const Lorem = styled.p`
  letter-spacing: 1px;
  line-height: 1.5rem;
  ${mobile({ marginBottom: '2rem' })}
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
  font-weight: 600;
  span {
    font-weight: 400;
  }
`;

const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const SizeButton = styled.button`
  background-color: transparent;
  outline: none;
  margin-left: 0.5rem;
  color: black;
  font-weight: 500;
  font-size: 16px;
  padding: 5px 7px;
  // margin-bottom: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    border: 1px solid black;
  }

  &:disabled {
    color: #b6b6b6;
    border: none;
    pointer-events: none;
  }

  &.active {
    background-color: black;
    color: white;
    border: 1px solid black;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  ${mobile({
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center'
  })}
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: ${props => props.active ? 'var(--clr-mocha-3)' : '#666'};
  border-bottom: 2px solid ${props => props.active ? 'var(--clr-mocha-3)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: var(--clr-mocha-3);
  }
`;

const TabContent = styled.div`
  padding: 2rem 0;
  min-height: 200px;
`;

const DescriptionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  h3 {
    margin-bottom: 1rem;
    color: var(--clr-primary);
  }
`;

const AdditionalContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  h3 {
    margin-bottom: 1rem;
    color: var(--clr-primary);
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
      padding-left: 1rem;
      position: relative;

      &:before {
        content: "•";
        color: var(--clr-mocha-3);
        position: absolute;
        left: 0;
      }
    }
  }
`;

const ReviewsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  h3 {
    margin-bottom: 1rem;
    color: var(--clr-primary);
  }

  .review-item {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const SimilarProductsSection = styled.div`
  margin-top: 3rem;
  padding: 2rem 0;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--clr-primary);
  }
`;

const SimilarProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;

  ${mobile({
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  })}
`;

const SimilarProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SimilarProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SimilarProductInfo = styled.div`
  padding: 1rem;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--clr-primary);
  }

  p {
    margin: 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
  }
`; 