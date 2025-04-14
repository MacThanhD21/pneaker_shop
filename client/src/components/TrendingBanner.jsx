import React from 'react';

const TrendingBanner = () => {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-red-400 to-orange-400 rounded-2xl my-8 shadow-lg">
      <div className="flex items-center gap-8 md:flex-col">
        <div className="flex-1 relative flex justify-center items-center">
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop" 
            alt="Trending"
            className="max-w-full h-auto rounded-xl shadow-lg animate-float"
          />
          <div className="absolute top-5 right-5 bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 font-semibold text-red-500 shadow-md">
            <span className="text-xl animate-float">🔥</span>
            <span>TRENDING NOW</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 text-white">
          <h3 className="text-lg font-semibold text-white bg-white/20 px-4 py-2 rounded-full inline-block">
            HOT TREND
          </h3>
          <h2 className="text-4xl md:text-3xl font-extrabold">
            Phong cách thời thượng
          </h2>
          <p className="text-lg opacity-90">
            Khám phá những xu hướng mới nhất
          </p>
          <div className="flex flex-col gap-3 my-4">
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg hover:bg-white/20 hover:translate-x-1 transition-all duration-300">
              <span className="text-xl">👟</span>
              <span className="font-medium">Sneaker mới</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg hover:bg-white/20 hover:translate-x-1 transition-all duration-300">
              <span className="text-xl">👕</span>
              <span className="font-medium">Streetwear</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg hover:bg-white/20 hover:translate-x-1 transition-all duration-300">
              <span className="text-xl">🕶️</span>
              <span className="font-medium">Phụ kiện</span>
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:flex-col">
            <button className="px-6 py-3 bg-white text-red-500 rounded-full font-semibold shadow-md hover:bg-gray-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              XEM NGAY
            </button>
            <button className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              THEO DÕI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingBanner; 