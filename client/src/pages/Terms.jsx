import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Điều Khoản Sử Dụng</h1>
        <p className="text-gray-600 text-lg">Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ của chúng tôi</p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8">
        {/* General Terms */}
        <section className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">1. Điều Khoản Chung</h2>
          <ul className="space-y-6">
            {[
              "Bằng việc sử dụng website Sneaker Shop, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này.",
              "Chúng tôi có quyền thay đổi các điều khoản này mà không cần thông báo trước.",
              "Việc tiếp tục sử dụng website sau khi có thay đổi được coi là chấp nhận các điều khoản mới."
            ].map((term, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">•</span>
                <p className="text-gray-600 leading-relaxed">{term}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* User Account */}
        <section className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">2. Tài Khoản Người Dùng</h2>
          <ul className="space-y-6">
            {[
              {
                title: "Đăng Ký Tài Khoản",
                description: "Người dùng phải cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản."
              },
              {
                title: "Bảo Mật Tài Khoản",
                description: "Người dùng chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động diễn ra trên tài khoản của mình."
              },
              {
                title: "Quyền Truy Cập",
                description: "Chúng tôi có quyền từ chối hoặc chấm dứt quyền truy cập nếu phát hiện vi phạm."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">•</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order & Payment */}
        <section className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">3. Đặt Hàng & Thanh Toán</h2>
          <ul className="space-y-6">
            {[
              {
                title: "Xác Nhận Đơn Hàng",
                description: "Đơn hàng chỉ được xác nhận sau khi thanh toán thành công."
              },
              {
                title: "Giá Cả",
                description: "Giá sản phẩm có thể thay đổi mà không cần thông báo trước."
              },
              {
                title: "Phương Thức Thanh Toán",
                description: "Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">•</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">4. Quyền Sở Hữu Trí Tuệ</h2>
          <ul className="space-y-6">
            {[
              {
                title: "Bản Quyền",
                description: "Mọi nội dung trên website đều thuộc bản quyền của Sneaker Shop."
              },
              {
                title: "Thương Hiệu",
                description: "Logo và thương hiệu Sneaker Shop được bảo hộ theo luật sở hữu trí tuệ."
              },
              {
                title: "Sử Dụng Nội Dung",
                description: "Không được phép sao chép hoặc sử dụng nội dung mà không có sự cho phép."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">•</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Liability */}
        <section className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">5. Giới Hạn Trách Nhiệm</h2>
          <ul className="space-y-6">
            {[
              {
                title: "Dịch Vụ",
                description: "Chúng tôi không đảm bảo website sẽ hoạt động liên tục hoặc không có lỗi."
              },
              {
                title: "Thông Tin",
                description: "Mọi thông tin trên website chỉ mang tính chất tham khảo."
              },
              {
                title: "Bên Thứ Ba",
                description: "Chúng tôi không chịu trách nhiệm về nội dung của các website bên thứ ba."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">•</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">6. Liên Hệ</h2>
          <p className="text-gray-600 mb-6">Nếu bạn có thắc mắc về điều khoản sử dụng, vui lòng liên hệ:</p>
          <ul className="space-y-4">
            {[
              "Email: legal@sneakershop.com",
              "Hotline: 1900 1234",
              "Giờ làm việc: 8:00 - 20:00 (Thứ 2 - Chủ Nhật)"
            ].map((contact, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                {contact}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Terms;