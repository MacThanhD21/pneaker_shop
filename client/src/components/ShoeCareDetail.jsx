import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tips } from '../data/shoeCareTips';

const ShoeCareDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const tip = tips.find(t => t.path === `/shoe-care/${id}`);

  if (!tip) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12 relative min-h-screen">
        <Link 
          to="/" 
          state={{ scrollPosition: location.state?.scrollPosition || 0 }}
          className="absolute left-8 top-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-x-1 transition-all duration-300"
        >
          Quay lại
        </Link>
        <h1 className="text-4xl font-bold text-pink-500 text-center mb-8">Không tìm thấy bài viết</h1>
        <Link 
          to="/shop"
          className="fixed left-8 bottom-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:translate-x-1 transition-all duration-300"
        >
          Tiếp tục mua sắm
          <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 relative min-h-screen">
      <Link 
        to="/" 
        state={{ scrollPosition: location.state?.scrollPosition || 0 }}
        className="absolute left-8 top-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-x-1 transition-all duration-300"
      >
        Quay lại
      </Link>

      <div className="text-center mb-12">
        <span className="text-4xl mb-4">{tip.icon}</span>
        <h1 className="text-4xl font-bold text-pink-500 mb-4">{tip.title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {tip.description}
        </p>
      </div>

      <div className="grid gap-12">
        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-pink-500 mb-8 text-center">Các Bước Thực Hiện</h2>
          <div className="grid gap-4">
            {tip.details.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-pink-500 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-pink-500 mb-8 text-center">Lưu Ý Quan Trọng</h2>
          <div className="grid gap-4">
            {tip.details.tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  💡
                </div>
                <p className="text-gray-600 text-lg">{tip}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShoeCareDetail; 