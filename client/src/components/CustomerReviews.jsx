import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import FadeInSection from './FadeInSection';

const CustomerReviews = () => {
  const [showAll, setShowAll] = useState(false);

  const initialReviews = [
    {
      id: 1,
      name: "Ngô Tuấn Anh",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment: "Sản phẩm chất lượng, giao hàng nhanh!",
      date: "15/06/2024"
    },
    {
      id: 2,
      name: "Mạc Văn Thành",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      comment: "Giày rất đẹp và thoải mái khi mang.",
      date: "10/06/2024"
    },
    {
      id: 3,
      name: "Trần Minh Quang",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "Dịch vụ chăm sóc khách hàng rất tốt!",
      date: "05/06/2024"
    }
  ];

  const additionalReviews = [
    {
      id: 4,
      name: "Lê Văn Hùng",
      avatar: "https://i.pravatar.cc/150?img=4",
      rating: 4,
      comment: "Giày đẹp nhưng hơi chật một chút. Chất lượng tốt.",
      date: "01/06/2024"
    },
    {
      id: 5,
      name: "Phạm Thị Mai",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment: "Rất hài lòng với dịch vụ và sản phẩm. Sẽ quay lại mua tiếp!",
      date: "28/05/2024"
    },
    {
      id: 6,
      name: "Nguyễn Văn Tú",
      avatar: "https://i.pravatar.cc/150?img=6",
      rating: 5,
      comment: "Đóng gói cẩn thận, giao hàng đúng hẹn. Cảm ơn shop!",
      date: "25/05/2024"
    },
    {
      id: 7,
      name: "Trần Thị Hoa",
      avatar: "https://i.pravatar.cc/150?img=7",
      rating: 4,
      comment: "Giày đẹp, giá cả hợp lý. Nhân viên tư vấn nhiệt tình.",
      date: "20/05/2024"
    },
    {
      id: 8,
      name: "Đỗ Văn Minh",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 5,
      comment: "Chất lượng vượt mong đợi. Đã giới thiệu cho bạn bè!",
      date: "15/05/2024"
    },
    {
      id: 9,
      name: "Hoàng Thị Lan",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      comment: "Mẫu mã đa dạng, nhiều lựa chọn. Rất thích shopping ở đây!",
      date: "10/05/2024"
    }
  ];

  const allReviews = [...initialReviews, ...additionalReviews];
  const displayedReviews = showAll ? allReviews : initialReviews;

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
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-16 h-16 rounded-full border-4 border-rose-200 object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, index) => (
                    <FaStar 
                      key={index} 
                      className="text-yellow-400 w-5 h-5"
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>

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
      </div>
    </section>
  );
};

export default CustomerReviews; 