import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Chính Sách Đổi Trả & Bảo Hành</h1>
        <p className="text-lg text-gray-600">Cam kết mang đến sự hài lòng tuyệt đối cho khách hàng</p>
      </div>

      <section className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Điều Kiện Đổi Trả</h2>
        <ul className="space-y-6">
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thời Gian Đổi Trả</h3>
            <p className="text-gray-600 leading-relaxed">Chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tình Trạng Sản Phẩm</h3>
            <p className="text-gray-600 leading-relaxed">Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ tem mác, phụ kiện.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Lý Do Đổi Trả</h3>
            <p className="text-gray-600 leading-relaxed">Đổi trả được chấp nhận trong các trường hợp: lỗi sản xuất, giao sai sản phẩm, không đúng size.</p>
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Quy Trình Đổi Trả</h2>
        <ul className="space-y-6">
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bước 1: Liên Hệ</h3>
            <p className="text-gray-600 leading-relaxed">Gọi hotline 1900 1234 hoặc gửi email đến support@sneakershop.com để thông báo đổi trả.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <span className="text-lg font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bước 2: Chuẩn Bị</h3>
            <p className="text-gray-600 leading-relaxed">Đóng gói sản phẩm nguyên vẹn kèm hóa đơn mua hàng và phiếu bảo hành.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <span className="text-lg font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bước 3: Gửi Hàng</h3>
            <p className="text-gray-600 leading-relaxed">Gửi sản phẩm về địa chỉ của chúng tôi hoặc sử dụng dịch vụ đổi trả tại nhà.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <span className="text-lg font-bold">4</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bước 4: Xử Lý</h3>
            <p className="text-gray-600 leading-relaxed">Chúng tôi sẽ kiểm tra và xử lý yêu cầu đổi trả trong vòng 3-5 ngày làm việc.</p>
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Chính Sách Bảo Hành</h2>
        <ul className="space-y-6">
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thời Gian Bảo Hành</h3>
            <p className="text-gray-600 leading-relaxed">Bảo hành 6 tháng cho tất cả sản phẩm chính hãng.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Phạm Vi Bảo Hành</h3>
            <p className="text-gray-600 leading-relaxed">Bảo hành các lỗi do nhà sản xuất, không bao gồm hư hỏng do sử dụng không đúng cách.</p>
          </li>
          <li className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center text-red-500">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quy Trình Bảo Hành</h3>
            <p className="text-gray-600 leading-relaxed">Mang sản phẩm đến cửa hàng gần nhất kèm hóa đơn mua hàng để được hỗ trợ.</p>
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Liên Hệ Hỗ Trợ</h2>
        <p className="text-gray-600 mb-4">Nếu bạn cần thêm thông tin về chính sách đổi trả và bảo hành, vui lòng liên hệ:</p>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-600">
            <i className="fas fa-envelope text-red-500 mr-2"></i>
            Email: support@sneakershop.com
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-phone text-red-500 mr-2"></i>
            Hotline: 1900 1234
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-clock text-red-500 mr-2"></i>
            Giờ làm việc: 8:00 - 20:00 (Thứ 2 - Chủ Nhật)
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReturnPolicy;