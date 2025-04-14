import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tips } from '../data/shoeCareTips';

const ShoeCareTips = () => {
  const [displayedTips, setDisplayedTips] = useState([]);
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Lưu vị trí cuộn khi rời khỏi trang
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Khôi phục vị trí cuộn khi quay lại
  useEffect(() => {
    if (location.state?.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);

  useEffect(() => {
    const updateTips = () => {
      const shuffledTips = [...tips];
      for (let i = shuffledTips.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTips[i], shuffledTips[j]] = [shuffledTips[j], shuffledTips[i]];
      }
      setDisplayedTips(shuffledTips.slice(0, 4));
    };

    updateTips();
    const interval = setInterval(updateTips, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-4xl font-bold text-pink-500 text-center mb-4 [text-shadow:_2px_2px_4px_rgba(219,112,147,0.2)]">
        Bí Quyết Chăm Sóc Giày
      </h2>
      <p className="text-gray-600 text-sm text-center mb-12 italic">
        Cập nhật mỗi 5 phút
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {displayedTips.map((tip) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Link 
              to={tip.path} 
              state={{ scrollPosition: window.scrollY }}
              className="no-underline text-inherit"
            >
              <div className="text-5xl mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold text-pink-500 mb-4">{tip.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{tip.description}</p>
              <span className="text-pink-500 font-semibold inline-block transition-transform duration-300 group-hover:translate-x-1">
                Xem chi tiết →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShoeCareTips;