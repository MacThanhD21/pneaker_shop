import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import logo from '../assets/items/adidas_yeezy_700_wave_runner.png';
import image from '../assets/items/nike_jordan_1_travis_mocha_high.png';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <img 
              src={logo} 
              alt="Pneaker Shop Logo"
              className="w-20 h-20 object-contain"
            />
            <h1 className="text-4xl font-bold text-gray-900 ml-4">
              About <span className="text-rose-600">Pneaker</span> Shop
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nơi hội tụ của đam mê và phong cách
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Từ năm 2018, Pneaker Shop đã bắt đầu hành trình mang đến những đôi giày sneaker 
                độc đáo và phong cách nhất từ các thương hiệu hàng đầu thế giới. Với hơn 5 năm 
                kinh nghiệm, chúng tôi không chỉ cung cấp những sản phẩm chất lượng mà còn 
                mang đến trải nghiệm mua sắm tuyệt vời nhất.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Từ những thiết kế đường phố cá tính đến những mẫu giày thể thao cao cấp, 
                Pneaker Shop tự hào là điểm đến tin cậy cho những người yêu thích sneaker 
                và muốn thể hiện phong cách riêng của mình.
              </p>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-rose-50 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-rose-600 mb-2">Chất Lượng</h3>
                <p className="text-gray-600 text-sm">
                  Cam kết 100% hàng chính hãng, chất lượng cao
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-rose-50 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-rose-600 mb-2">Dịch Vụ</h3>
                <p className="text-gray-600 text-sm">
                  Hỗ trợ 24/7, đổi trả dễ dàng
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={image} 
                alt="Nike Jordan 1 Travis Mocha High"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            {/* Social Media Links */}
            <div className="absolute bottom-4 right-4 flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/macvan9833/"
                className="bg-white/90 p-3 rounded-full text-gray-800 hover:text-rose-600 transition-colors"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/thanh.macvan.31586"
                className="bg-white/90 p-3 rounded-full text-gray-800 hover:text-rose-600 transition-colors"
              >
                <FaFacebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.twitter.com/@macvan9833"
                className="bg-white/90 p-3 rounded-full text-gray-800 hover:text-rose-600 transition-colors"
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.tiktok.com/@macvan9833"
                className="bg-white/90 p-3 rounded-full text-gray-800 hover:text-rose-600 transition-colors"
              >
                <FaTiktok size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn Sàng Thể Hiện Phong Cách Của Bạn?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Khám phá bộ sưu tập sneaker độc đáo của chúng tôi và tìm kiếm đôi giày 
            hoàn hảo cho phong cách của bạn
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-rose-600 text-white px-8 py-3 rounded-full font-medium 
                     hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Khám Phá Ngay
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;