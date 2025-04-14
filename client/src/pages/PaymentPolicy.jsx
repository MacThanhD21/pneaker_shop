import React from 'react';

const PaymentPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Chính Sách Thanh Toán</h1>
        <p className="text-lg text-gray-600">Đa dạng phương thức thanh toán an toàn và tiện lợi</p>
      </div>

      <section className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Phương Thức Thanh Toán</h2>
        
        <div className="flex items-center mb-6 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="w-12 h-12 mr-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <i className="fas fa-credit-card text-xl text-red-500"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thẻ Tín Dụng/Thẻ Ghi Nợ</h3>
            <p className="text-gray-600 leading-relaxed">Chấp nhận các loại thẻ Visa, MasterCard, JCB. Thanh toán nhanh chóng và an toàn.</p>
          </div>
        </div>

        <div className="flex items-center mb-6 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="w-12 h-12 mr-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <i className="fas fa-money-bill-wave text-xl text-red-500"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chuyển Khoản Ngân Hàng</h3>
            <p className="text-gray-600 leading-relaxed">Chuyển khoản trực tiếp đến tài khoản ngân hàng của chúng tôi.</p>
          </div>
        </div>

        <div className="flex items-center mb-6 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="w-12 h-12 mr-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <i className="fas fa-wallet text-xl text-red-500"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ví Điện Tử</h3>
            <p className="text-gray-600 leading-relaxed">Thanh toán qua MoMo, ZaloPay, VNPay với nhiều ưu đãi.</p>
          </div>
        </div>

        <div className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="w-12 h-12 mr-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <i className="fas fa-truck text-xl text-red-500"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thanh Toán Khi Nhận Hàng (COD)</h3>
            <p className="text-gray-600 leading-relaxed">Thanh toán bằng tiền mặt khi nhận hàng tại nhà.</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Bảo Mật Thanh Toán</h2>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Mã hóa thông tin thanh toán theo chuẩn PCI DSS
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Không lưu trữ thông tin thẻ tín dụng
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Xác thực 2 bước cho giao dịch lớn
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Hệ thống giám sát giao dịch 24/7
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Chính Sách Hoàn Tiền</h2>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Hoàn tiền trong vòng 7 ngày làm việc
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Áp dụng cho đơn hàng bị hủy hoặc đổi trả
          </li>
          <li className="flex items-center text-gray-600">
            <i className="fas fa-check-circle text-red-500 mr-2"></i>
            Phí hoàn tiền tùy thuộc vào phương thức thanh toán
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Liên Hệ Hỗ Trợ</h2>
        <p className="text-gray-600 mb-4">Nếu bạn cần hỗ trợ về thanh toán, vui lòng liên hệ:</p>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-600">
            <i className="fas fa-envelope text-red-500 mr-2"></i>
            Email: payment@sneakershop.com
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

export default PaymentPolicy; 