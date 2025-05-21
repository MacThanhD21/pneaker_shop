import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import FadeInSection from './FadeInSection';
import { GET_PRODUCTS_REVIEWS } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const CustomerReviews = () => {
  const [showAll, setShowAll] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCTS_REVIEWS);

  if (loading) return <Loading />;
  if (error) return <MuiError value={error.message} type="error" />;

  // Lấy tất cả reviews từ tất cả sản phẩm
  const allReviews = data?.getProducts?.reduce((acc, product) => {
    const productReviews = product.reviews?.map(review => ({
      id: `${product.id}-${review.userId}`,
      productName: product.title,
      rating: review.rating,
      comment: review.comment,
      date: new Date(review.createdAt).toLocaleDateString('vi-VN'),
      imageList: review.imageList || []
    })) || [];
    return [...acc, ...productReviews];
  }, []) || [];

  // Sắp xếp reviews theo số sao (cao nhất) và ngày mới nhất
  const sortedReviews = allReviews
    .sort((a, b) => {
      // Ưu tiên sắp xếp theo số sao
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // Nếu số sao bằng nhau thì sắp xếp theo ngày mới nhất
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 9); // Giới hạn 10 reviews

  // Chia reviews thành 2 nhóm: hiển thị ban đầu và thêm
  const initialReviews = sortedReviews.slice(0, 3);
  const additionalReviews = sortedReviews.slice(3);
  const displayedReviews = showAll ? sortedReviews : initialReviews;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-center text-rose-600 mb-12">
            Đánh Giá Từ Khách Hàng
          </h2>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReviews.map((review, index) => (
            <FadeInSection key={review.id} delay={index * 0.1}>
              <div 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-rose-200 bg-rose-100 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{review.productName}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, index) => (
                      <FaStar 
                        key={index} 
                        className="text-yellow-400 w-5 h-5"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({review.rating} sao)
                  </span>
                </div>

                <p className="text-gray-600 italic leading-relaxed">
                  "{review.comment}"
                </p>

                {review.imageList?.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {review.imageList.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Review image ${imgIndex + 1}`}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>

        {additionalReviews.length > 0 && (
          <FadeInSection delay={0.3}>
            <div className="mt-12 text-center">
              <button 
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {showAll ? "Ẩn Bớt Đánh Giá" : "Xem Thêm Đánh Giá"}
              </button>
            </div>
          </FadeInSection>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews; 