import React from 'react';

const Careers = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gia Nhập Đội Ngũ Sneaker Shop
        </h1>
        <p className="text-lg text-gray-600">
          Cơ hội phát triển sự nghiệp trong ngành thời trang sneaker
        </p>
      </div>

      <section className="bg-white rounded-xl p-8 mb-8 shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
          Vị Trí Tuyển Dụng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Chuyên Viên Tư Vấn Bán Hàng
            </h3>
            <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i>
                Hà Nội
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-briefcase"></i>
                Full-time
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Tư vấn và hỗ trợ khách hàng trong quá trình mua sắm, đảm bảo trải nghiệm mua sắm tốt nhất.
            </p>
            <a 
              href="/apply/sales-consultant" 
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300"
            >
              Ứng Tuyển Ngay
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Chuyên Viên Digital Marketing
            </h3>
            <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i>
                TP.HCM
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-briefcase"></i>
                Full-time
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Xây dựng và triển khai chiến lược marketing kỹ thuật số, quản lý các kênh truyền thông.
            </p>
            <a 
              href="/apply/digital-marketing" 
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300"
            >
              Ứng Tuyển Ngay
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Kỹ Thuật Viên Bảo Dưỡng Giày
            </h3>
            <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i>
                Hà Nội
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-briefcase"></i>
                Full-time
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thực hiện các dịch vụ bảo dưỡng và sửa chữa sneaker, đảm bảo chất lượng dịch vụ.
            </p>
            <a 
              href="/apply/shoe-technician" 
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300"
            >
              Ứng Tuyển Ngay
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 rounded-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Quyền Lợi Khi Làm Việc Tại Sneaker Shop
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-4xl text-red-500 mb-6">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Lương Thưởng Cạnh Tranh
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Mức lương hấp dẫn và chế độ thưởng theo hiệu suất công việc.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-4xl text-red-500 mb-6">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Đào Tạo & Phát Triển
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cơ hội học hỏi và phát triển kỹ năng chuyên môn.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-4xl text-red-500 mb-6">
              <i className="fas fa-shoe-prints"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ưu Đãi Sản Phẩm
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hưởng ưu đãi đặc biệt khi mua sắm tại Sneaker Shop.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-4xl text-red-500 mb-6">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Bảo Hiểm Sức Khỏe
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Chế độ bảo hiểm sức khỏe toàn diện cho nhân viên.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
          Quy Trình Tuyển Dụng
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-600">
          <li className="pl-4">Nộp hồ sơ ứng tuyển qua website hoặc email</li>
          <li className="pl-4">Phỏng vấn sơ bộ với bộ phận nhân sự</li>
          <li className="pl-4">Phỏng vấn chuyên môn với trưởng bộ phận</li>
          <li className="pl-4">Thử việc (nếu cần)</li>
          <li className="pl-4">Nhận thư mời làm việc chính thức</li>
        </ol>
      </section>
    </div>
  );
};

export default Careers; 