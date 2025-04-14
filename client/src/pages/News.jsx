import React from 'react';
import { Link } from 'react-router-dom';

const News = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tin Tức & Sự Kiện
        </h1>
        <p className="text-lg text-gray-600">
          Cập nhật những thông tin mới nhất về sneaker và các sự kiện đặc biệt
        </p>
      </div>

      <section className="mb-12">
        <div className="relative h-[500px] rounded-2xl overflow-hidden group">
          <img 
            src="/images/featured-news.jpg" 
            alt="Featured News" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ra Mắt BST Mới: Nike Air Max Day 2024
              </h2>
              <p className="text-lg opacity-90 mb-4">
                Khám phá những thiết kế độc đáo và đột phá trong BST Air Max mới nhất
              </p>
              <div className="flex items-center gap-4 text-sm opacity-80">
                <span>26/03/2024</span>
                <span>•</span>
                <span>5 phút đọc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Tin Tức Mới Nhất
          </h2>
          <Link 
            to="/news/all" 
            className="text-red-500 font-medium hover:text-red-600 transition-colors duration-300"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <img 
              src="/images/news-1.jpg" 
              alt="News 1" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Adidas Originals: Tái Sinh Dòng Sản Phẩm Cổ Điển
              </h3>
              <p className="text-gray-600 mb-4">
                Khám phá cách Adidas đang làm mới những thiết kế cổ điển với công nghệ hiện đại...
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>25/03/2024</span>
                <span>•</span>
                <span>3 phút đọc</span>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <img 
              src="/images/news-2.jpg" 
              alt="News 2" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Xu Hướng Sneaker 2024: Từ Streetwear Đến High Fashion
              </h3>
              <p className="text-gray-600 mb-4">
                Những xu hướng sneaker nổi bật sẽ thống trị năm 2024...
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>24/03/2024</span>
                <span>•</span>
                <span>4 phút đọc</span>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <img 
              src="/images/news-3.jpg" 
              alt="News 3" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Bảo Dưỡng Sneaker: Bí Quyết Giữ Giày Mới Như Vừa Mua
              </h3>
              <p className="text-gray-600 mb-4">
                Hướng dẫn chi tiết cách chăm sóc và bảo quản sneaker của bạn...
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>23/03/2024</span>
                <span>•</span>
                <span>5 phút đọc</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Sự Kiện Sắp Diễn Ra
        </h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Triển Lãm Sneaker Quốc Tế 2024
              </h3>
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                15/04/2024
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Tham gia triển lãm sneaker lớn nhất năm với hàng ngàn mẫu thiết kế độc đáo từ các thương hiệu hàng đầu thế giới.
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <i className="fas fa-map-marker-alt"></i>
              <span>Trung Tâm Triển Lãm Quốc Tế, TP.HCM</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Workshop: Custom Sneaker Cơ Bản
              </h3>
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                20/04/2024
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Học cách tùy chỉnh sneaker của bạn với các chuyên gia trong ngành. Workshop dành cho người mới bắt đầu.
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <i className="fas fa-map-marker-alt"></i>
              <span>Sneaker Shop Studio, Hà Nội</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News; 