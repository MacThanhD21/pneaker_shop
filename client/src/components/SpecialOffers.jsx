import React from 'react';
import { Link } from 'react-router-dom';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Giảm Giá Mùa Hè",
      discount: "30%",
      description: "Áp dụng cho tất cả giày thể thao",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
      endDate: "31/08/2024",
      code: "SUMMER30"
    },
    {
      id: 2,
      title: "Flash Sale",
      discount: "50%",
      description: "Giảm giá đặc biệt cho các sản phẩm bán chạy",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
      endDate: "24/06/2024",
      code: "FLASH50"
    }
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-4xl font-bold text-pink-500 text-center mb-12 [text-shadow:_2px_2px_4px_rgba(219,112,147,0.2)]">
        Ưu Đãi Đặc Biệt
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-md">
                -{offer.discount}
              </span>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="mb-6 p-4 bg-pink-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Mã Giảm Giá:</span>
                  <span className="font-bold text-pink-500">{offer.code}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hết Hạn:</span>
                  <span className="font-bold text-pink-500">{offer.endDate}</span>
                </div>
              </div>
              <Link 
                to="/shop"
                className="block w-full"
              >
                <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Mua Ngay
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers; 