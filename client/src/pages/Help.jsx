import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hướng Dẫn Mua Hàng
        </h1>
        <p className="text-lg text-gray-600">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình mua sắm
        </p>
      </div>

      <section className="bg-white rounded-xl p-8 mb-8 shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
          Quy Trình Mua Hàng
        </h2>
        <ol className="space-y-8">
          <li className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tìm Kiếm Sản Phẩm
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sử dụng thanh tìm kiếm hoặc duyệt qua các danh mục để tìm sản phẩm bạn yêu thích.
            </p>
          </li>
          <li className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thêm Vào Giỏ Hàng
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Chọn size và số lượng, sau đó nhấn "Thêm vào giỏ hàng".
            </p>
          </li>
          <li className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thanh Toán
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Kiểm tra giỏ hàng và tiến hành thanh toán với các phương thức thanh toán an toàn.
            </p>
          </li>
          <li className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Xác Nhận Đơn Hàng
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Theo dõi đơn hàng của bạn qua email xác nhận và hệ thống quản lý đơn hàng.
            </p>
          </li>
        </ol>
      </section>

      <section className="bg-white rounded-xl p-8 mb-8 shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
          Câu Hỏi Thường Gặp
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Làm thế nào để kiểm tra size giày?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi cung cấp bảng size chi tiết cho từng dòng sản phẩm. Bạn có thể tham khảo tại trang chi tiết sản phẩm.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Thời gian giao hàng là bao lâu?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Thời gian giao hàng từ 2-5 ngày làm việc tùy thuộc vào khu vực của bạn.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Tôi có thể đổi trả sản phẩm không?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi chấp nhận đổi trả trong vòng 7 ngày nếu sản phẩm còn nguyên vẹn và chưa qua sử dụng.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
          Liên Hệ Hỗ Trợ
        </h2>
        <p className="text-gray-600 mb-6">
          Nếu bạn cần thêm hỗ trợ, vui lòng liên hệ với chúng tôi qua:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors duration-300">
            <div className="text-3xl text-red-500 mb-4">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">support@sneakershop.com</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors duration-300">
            <div className="text-3xl text-red-500 mb-4">
              <i className="fas fa-phone"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hotline</h3>
            <p className="text-gray-600">1900 1234</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors duration-300">
            <div className="text-3xl text-red-500 mb-4">
              <i className="fas fa-comments"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat trực tuyến</h3>
            <p className="text-gray-600">24/7</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;