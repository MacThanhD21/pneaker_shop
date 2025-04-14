import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-wide">PSneaker</h2>
            <p className="text-gray-600 leading-relaxed">
              Hệ thống bán lẻ giày thể thao chính hãng, 
              phân phối các thương hiệu lớn tại PTIT
            </p>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">HỆ THỐNG CỬA HÀNG</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-rose-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Cơ sở 1:</p>
                    <p className="text-gray-600">Km10, Đường Nguyễn Trãi, Q. Hà Đông, Hà Nội</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-rose-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Cơ sở 2:</p>
                    <p className="text-gray-600">122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-rose-500" />
                  <p className="text-gray-600">Hotline: 0786665444</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-rose-500" />
                  <a href="mailto:ptit@edu.vn" className="text-gray-600 hover:text-rose-500 transition-colors">
                    ptit@edu.vn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Về chúng tôi</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Tuyển Dụng
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Dịch Vụ Spa, Sửa Giày
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Tin Tức - Sự Kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Chính sách đổi trả và bảo hành
                </Link>
              </li>
              <li>
                <Link to="/payment-policy" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Chính Sách Thanh Toán
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-rose-500 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Điều khoản trang web
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/thanh.macvan.31586" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="https://www.instagram.com/macvan9833/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="https://www.youtube.com/@MVTBDCCN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaYoutube className="text-xl" />
              </a>
              <a 
                href="https://www.tiktok.com/@macvan9833" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaTiktok className="text-xl" />
              </a>
            </div>

            <div className="mt-6 p-4 bg-rose-50 rounded-lg">
              <h4 className="text-sm font-semibold text-rose-800 mb-2">Lưu ý:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  Đơn hàng sẽ được xử lý trong vòng 24 giờ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  Hỗ trợ đổi trả trong vòng 7 ngày
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © 2024 Bản quyền thuộc về Psneaker Shop. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
