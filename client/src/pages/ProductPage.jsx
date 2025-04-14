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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100/30">
      <Navbar />
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to='/shop' className="inline-block mb-6">
          <button className="bg-rose-800 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            Quay lại cửa hàng
          </button>
        </Link>

        {loading ? (
          <Loading />
        ) : error ? (
          <MuiError type='error' value={error.message} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative group">
                <img 
                  src={images[currentImageIndex]} 
                  alt={title}
                  className="w-full h-[450px] object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl ring-2 ring-rose-100/50"
                />
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
              </div>

              <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <Stars stars={rates} />
                <p className="text-2xl font-semibold text-rose-800">
                  {formatVNDPrice(price)}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {brand} {model} - Sản phẩm được thiết kế với chất liệu cao cấp, đảm bảo độ bền và thoải mái khi sử dụng. Phù hợp cho mọi hoạt động thể thao và casual.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tình trạng:</span>
                    <span className={inStock ? 'text-green-600' : 'text-red-600'}>
                      {inStock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Thương hiệu:</span>
                    <span>{brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Model:</span>
                    <span>{model}</span>
                  </div>

                  {inStock && (
                    <div className="space-y-2">
                      <span className="font-medium block">Kích thước:</span>
                      <div className="flex flex-wrap gap-2">
                        {size?.map((size, index) => (
                          <button
                            key={index}
                            onClick={() => setShoeSize(size)}
                            disabled={matchUserId && filteredCartProducts && filteredSizesFromCart?.includes(size)}
                            className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                              shoeSize === size 
                                ? 'bg-rose-800 text-white border-rose-800' 
                                : 'bg-white text-gray-900 border-gray-300 hover:border-rose-800'
                            } ${
                              matchUserId && filteredCartProducts && filteredSizesFromCart?.includes(size)
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading || !inStock}
                    className={`w-full py-3 rounded-md text-white font-medium transition-all duration-300 ${
                      inStock 
                        ? 'bg-rose-800 hover:bg-rose-700 shadow-md hover:shadow-lg' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                  </button>

                  {cartLoading && <Loading />}
                  {cartError && (
                    <MuiError type='error' value={cartError.message} />
                  )}
                  {success && (
                    <div className="p-4 bg-green-50 text-green-800 rounded-md shadow-sm">
                      <p>Đã thêm vào giỏ hàng!</p>
                      <Link to='/cart' className="text-green-600 hover:underline">
                        Xem giỏ hàng
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-b border-rose-100 mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-3 font-medium transition-all duration-300 ${
                    activeTab === 'description'
                      ? 'text-rose-800 border-b-2 border-rose-800'
                      : 'text-gray-600 hover:text-rose-800'
                  }`}
                >
                  Mô Tả Sản Phẩm
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`px-6 py-3 font-medium transition-all duration-300 ${
                    activeTab === 'additional'
                      ? 'text-rose-800 border-b-2 border-rose-800'
                      : 'text-gray-600 hover:text-rose-800'
                  }`}
                >
                  Thông tin Bổ Sung
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 font-medium transition-all duration-300 ${
                    activeTab === 'reviews'
                      ? 'text-rose-800 border-b-2 border-rose-800'
                      : 'text-gray-600 hover:text-rose-800'
                  }`}
                >
                  Đánh Giá
                </button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Mô tả chi tiết sản phẩm</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Đây là phần mô tả chi tiết về sản phẩm {title}. Sản phẩm được thiết kế với chất liệu cao cấp, 
                    đảm bảo độ bền và thoải mái khi sử dụng. Phù hợp cho mọi hoạt động thể thao và casual.
                  </p>
                </div>
              )}

              {activeTab === 'additional' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Thông tin bổ sung</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-rose-800">•</span>
                      Chất liệu: Da tổng hợp cao cấp
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-rose-800">•</span>
                      Đế: Cao su đúc nguyên khối
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-rose-800">•</span>
                      Bảo hành: 12 tháng
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-rose-800">•</span>
                      Xuất xứ: Việt Nam
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Đánh giá sản phẩm</h3>
                  <div className="border-b border-rose-100 pb-4">
                    <Stars stars={4} />
                    <p className="text-gray-600 mt-2">Nguyễn Văn A - 2 ngày trước</p>
                    <p className="text-gray-600 mt-1">Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh chóng.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Sản phẩm tương tự</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {similarProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900">{product.title}</h4>
                      <p className="text-gray-600 text-sm">{product.brand}</p>
                      <p className="text-rose-800 font-semibold mt-2">
                        {formatVNDPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage; 