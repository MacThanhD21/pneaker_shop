import React from 'react';

const SpaServices = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Dịch Vụ Spa & Sửa Chữa Giày</h1>
        <p className="text-gray-600 text-lg">Chăm sóc và bảo dưỡng giày chuyên nghiệp</p>
      </div>

      {/* Spa Services Section */}
      <section className="bg-white rounded-xl p-8 shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">Dịch Vụ Spa Giày</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {[
            {
              title: "Vệ Sinh Chuyên Sâu",
              description: "Làm sạch toàn diện, loại bỏ vết bẩn và mùi hôi, phục hồi vẻ ngoài như mới.",
              price: "200.000đ",
              link: "/book/spa-deep-clean"
            },
            {
              title: "Phục Hồi Da",
              description: "Xử lý vết xước, nứt da, phục hồi độ bóng và mềm mại của da.",
              price: "300.000đ",
              link: "/book/leather-restore"
            },
            {
              title: "Bảo Dưỡng Đế",
              description: "Làm sạch, khử mùi và xử lý mòn đế, kéo dài tuổi thọ đôi giày.",
              price: "250.000đ",
              link: "/book/sole-care"
            }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
              <p className="text-red-500 text-lg font-bold mb-4">Từ {service.price}</p>
              <a 
                href={service.link}
                className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Đặt Lịch Ngay
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="bg-white rounded-xl p-8 shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100">Dịch Vụ Sửa Chữa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {[
            {
              title: "Thay Đế",
              description: "Thay thế đế mòn bằng đế mới, đảm bảo độ bền và thoải mái khi sử dụng.",
              price: "400.000đ",
              link: "/book/sole-replacement"
            },
            {
              title: "Sửa Chữa Da",
              description: "Xử lý các vấn đề về da như rách, bong tróc, phục hồi tính thẩm mỹ.",
              price: "350.000đ",
              link: "/book/leather-repair"
            },
            {
              title: "Thay Dây Giày",
              description: "Thay thế dây giày cũ, hỏng bằng dây mới, nhiều màu sắc và chất liệu.",
              price: "150.000đ",
              link: "/book/lace-replacement"
            }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
              <p className="text-red-500 text-lg font-bold mb-4">Từ {service.price}</p>
              <a 
                href={service.link}
                className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Đặt Lịch Ngay
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 rounded-xl p-12 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Quy Trình Dịch Vụ</h2>
        <div className="space-y-6">
          {[
            {
              number: "1",
              title: "Tiếp Nhận & Kiểm Tra",
              description: "Nhân viên tiếp nhận và kiểm tra tình trạng giày, tư vấn dịch vụ phù hợp."
            },
            {
              number: "2",
              title: "Xử Lý & Sửa Chữa",
              description: "Thực hiện các dịch vụ đã đăng ký với quy trình chuyên nghiệp."
            },
            {
              number: "3",
              title: "Kiểm Tra Chất Lượng",
              description: "Kiểm tra kỹ lưỡng trước khi bàn giao cho khách hàng."
            },
            {
              number: "4",
              title: "Bàn Giao & Bảo Hành",
              description: "Bàn giao sản phẩm và tư vấn cách bảo quản, bảo hành dịch vụ."
            }
          ].map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-6">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpaServices; 