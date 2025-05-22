import React, { useState, useEffect } from 'react';
import { Navbar, Stars, Footer } from '../components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ADD_TO_CART } from '../graphql/Mutations/cartMutations';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { formatVNDPrice } from '../utils/formatPrice';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import RecommendedProducts from '../components/RecommendedProducts';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomDialogPosition, setZoomDialogPosition] = useState({ x: 0, y: 0 });

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
        setSelectedSize(null);
        setQuantity(1);
        setSuccess(true);
      },
      variables: {
        userId,
        productId: id,
        size: selectedSize,
        quantity: quantity,
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
      console.log('Product data received:', data);
      setProduct(data?.getProductById);
      const availableSize = data?.getProductById.size.find(size => size.quantity > 0);
      setSelectedSize(availableSize ? availableSize.size : null);
    }
  }, [data]);

  if (!product) return null;

  const { image, title, price, rates, inStock, brand, model, size, reviews, color, description, additionalInfo } = product;
  const images = [image];

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

  const filteredCartProducts = cart?.getUserCart?.cartProducts?.filter(
    (c) => c.productId === id
  );
  const filteredSizesFromCart = filteredCartProducts?.map((c) => +c.size);
  const matchUserId = userId === cart?.getUserCart?.userId;

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

    if (!selectedSize) {
      toast.error('Vui lòng chọn kích thước!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (size.find(size => size.size === selectedSize)?.quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Tính toán vị trí zoom để hiển thị đúng vùng tương ứng với con trỏ
    setZoomPosition({ x: x, y: y });
    
    // Điều chỉnh vị trí dialog để không che khuất con trỏ
    setZoomDialogPosition({ 
      x: e.clientX + 20, 
      y: e.clientY + 20 
    });
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

  // Generate schema markup for the product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "image": images,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "model": model,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "VND",
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Your Sneaker Shop"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rates,
      "reviewCount": reviews?.length || 0
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${title} | ${brand} ${model} - Giày Sneaker Cao Cấp`}</title>
        <meta name="description" content={`${description?.substring(0, 155)}...`} />
        <meta name="keywords" content={`${brand}, ${model}, giày sneaker, ${color}, giày cao cấp, ${title.toLowerCase()}`} />
        <link rel="canonical" href={`https://yourdomain.com/shop/${id}`} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={`${title} | ${brand} ${model}`} />
        <meta property="og:description" content={description?.substring(0, 155)} />
        <meta property="og:image" content={images[0]} />
        <meta property="og:type" content="product" />
        
        {/* Schema.org markup for Product */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100/30">
        <Navbar />
        <ToastContainer />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav aria-label="Breadcrumb">
            <Link to='/shop' className="inline-block mb-6">
              <button 
                className="bg-rose-800 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                aria-label="Return to shop"
              >
                Quay lại cửa hàng
              </button>
            </Link>
          </nav>

          {loading ? (
            <div role="status" aria-label="Đang tải thông tin sản phẩm">
              <Loading />
            </div>
          ) : error ? (
            <div role="alert">
              <MuiError type='error' value={error.message} />
            </div>
          ) : (
            <>
              <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <section aria-label="Hình ảnh sản phẩm" className="relative group">
                  <div 
                    className="relative overflow-hidden rounded-lg"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img 
                      src={images[currentImageIndex]} 
                      alt={`${title} - ${brand} ${model} in ${color}`}
                      className="w-full h-[450px] object-cover transition-all duration-300 cursor-zoom-in"
                    />
                  </div>
                  {showZoom && (
                    <div 
                      className="fixed w-[300px] h-[300px] rounded-lg shadow-2xl border-2 border-white overflow-hidden pointer-events-none z-50"
                      style={{
                        left: `${zoomDialogPosition.x}px`,
                        top: `${zoomDialogPosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        backgroundImage: `url(${images[currentImageIndex]})`,
                        backgroundSize: '300%',
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentImageIndex === index ? 'bg-rose-800' : 'bg-rose-800/50'
                        }`}
                      />
                    ))}
                  </div>
                </section>

                <section aria-label="Product details">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                  <div className="flex items-center space-x-2 mb-4">
                    <Stars stars={rates} />
                    <span className="text-gray-600">({reviews?.length || 0} reviews)</span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-2xl font-bold text-rose-600">{formatVNDPrice(price)}</p>
                    <p className="text-sm text-gray-500">Miễn phí vận chuyển cho mọi đơn hàng</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Chọn Kích Thước</h2>
                      <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Kích thước có sẵn">
                        {size.map((s) => {
                          const isSizeInCart = filteredSizesFromCart?.includes(s.size);
                          return (
                            <button
                              key={s.size}
                              className={`p-2 border rounded-md text-center ${
                                selectedSize === s.size
                                  ? 'border-rose-500 bg-rose-50 text-rose-600'
                                  : 'border-gray-200 hover:border-rose-300'
                              } ${(s.quantity === 0 || isSizeInCart) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => s.quantity > 0 && !isSizeInCart && setSelectedSize(s.size)}
                              disabled={s.quantity === 0 || isSizeInCart}
                              role="radio"
                              aria-checked={selectedSize === s.size}
                              aria-label={`Size ${s.size} - ${s.quantity} available`}
                            >
                              {s.size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">Số Lượng</h2>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className={`p-2 border rounded-md ${
                            quantity <= 1 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-gray-50'
                          }`}
                          aria-label="Giảm số lượng"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={!selectedSize || quantity >= (size.find(s => s.size === selectedSize)?.quantity || 0)}
                          className={`p-2 border rounded-md ${
                            !selectedSize || quantity >= (size.find(s => s.size === selectedSize)?.quantity || 0)
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-gray-50'
                          }`}
                          aria-label="Tăng số lượng"
                        >
                          +
                        </button>
                      </div>
                      {selectedSize && (
                        <p className="text-sm text-gray-500 mt-2">
                          Còn lại: {size.find(s => s.size === selectedSize)?.quantity || 0} đôi
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-3 rounded-md transition-colors duration-300 ${
                        !selectedSize || !size.find(s => s.size === selectedSize)?.quantity > 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-rose-600 text-white hover:bg-rose-700'
                      }`}
                      disabled={!selectedSize || !size.find(s => s.size === selectedSize)?.quantity > 0}
                      aria-label="Thêm vào giỏ hàng"
                    >
                      Thêm Vào Giỏ Hàng
                    </button>
                  </div>
                </section>
              </article>

              <section aria-label="Thông tin sản phẩm" className="mb-12">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8" aria-label="Các tab thông tin sản phẩm">
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'description'
                          ? 'border-rose-500 text-rose-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab('description')}
                      aria-selected={activeTab === 'description'}
                    >
                      Mô Tả
                    </button>
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'additional'
                          ? 'border-rose-500 text-rose-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab('additional')}
                      aria-selected={activeTab === 'additional'}
                    >
                      Thông Tin Thêm
                    </button>
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'reviews'
                          ? 'border-rose-500 text-rose-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab('reviews')}
                      aria-selected={activeTab === 'reviews'}
                    >
                      Đánh Giá ({reviews?.length || 0})
                    </button>
                  </nav>
                </div>

                <div className="py-6">
                  {activeTab === 'description' && (
                    <div className="prose max-w-none">
                      <p>{description}</p>
                    </div>
                  )}
                  {activeTab === 'additional' && (
                    <div className="prose max-w-none">
                      <p>{additionalInfo}</p>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      {reviews?.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Stars stars={review.rating} />
                            <span className="text-gray-600">{review.userName}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* <section aria-label="Sản phẩm tương tự" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Sản Phẩm Tương Tự</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/shop/${product.id}`}
                      className="group"
                      aria-label={`View ${product.title}`}
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={product.image}
                          alt={`${product.title} - ${product.brand}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                          <p className="text-rose-600 font-bold">{formatVNDPrice(product.price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section> */}
            </>
          )}

          {/* Add RecommendedProducts component before Footer */}
          {id && (
            <div className="mt-12">
              {console.log('Rendering RecommendedProducts with id:', id)}
              <RecommendedProducts itemId={id} />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage; 