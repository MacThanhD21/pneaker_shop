import React from 'react';

const SummerCollectionBanner = () => {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-teal-300 to-pink-200 rounded-2xl my-8 shadow-lg">
      <div className="flex items-center gap-8 md:flex-col">
        <div className="flex-1 relative flex justify-center items-center">
          <img 
            src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop" 
            alt="Summer Collection"
            className="max-w-full h-auto rounded-xl shadow-md"
          />
          <div 
            className="absolute -top-5 -right-5 w-24 h-24 bg-cover opacity-80 rotate-12"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=100&h=100&fit=crop')"
            }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 text-gray-800">
          <h3 className="text-lg font-semibold text-white bg-white/20 px-4 py-2 rounded-full inline-block">
            NEW ARRIVAL
          </h3>
          <h2 className="text-4xl md:text-3xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Step into Summer
          </h2>
          <p className="text-lg text-gray-600">
            Thoáng khí – Nhẹ nhàng – Cực chất
          </p>
          <div className="flex gap-4 mt-4 md:flex-col">
            <button className="px-6 py-3 bg-white text-teal-400 rounded-full font-semibold shadow-md hover:bg-gray-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              KHÁM PHÁ NGAY
            </button>
            <button className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              XEM THÊM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerCollectionBanner; 