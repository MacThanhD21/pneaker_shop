import React from 'react';

const LimitedEditionBanner = () => {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-black to-gray-900 rounded-2xl my-8 shadow-[0_10px_30px_rgba(0,255,0,0.2)]
      sm:p-6">
      <div className="flex items-center gap-8
        sm:flex-col-reverse sm:gap-6">
        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-4 text-white">
          <h3 className="text-lg font-semibold text-green-400 bg-green-400/10 px-4 py-2 rounded-full inline-block animate-[neonPulse_2s_infinite]">
            LIMITED EDITION
          </h3>
          <h2 className="text-4xl font-extrabold text-green-400 animate-[neonPulse_2s_infinite]
            sm:text-3xl">
            Bùng nổ cá tính
          </h2>
          <p className="text-lg text-white/80">
            Sở hữu phiên bản giới hạn ngay hôm nay!
          </p>
          <div className="flex gap-4 mt-4
            sm:flex-col">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-400 text-black font-semibold rounded-full 
              hover:bg-green-500 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,255,0,0.3)] transition-all duration-300">
              <span>MUA NGAY</span>
              <span className="text-xl animate-[neonPulse_2s_infinite]">✨</span>
            </button>
            <button className="px-6 py-3 border-2 border-green-400 text-green-400 font-semibold rounded-full
              hover:bg-green-400/10 transition-colors duration-300">
              CHI TIẾT
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative flex justify-center items-center">
          <img 
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop" 
            alt="Limited Edition"
            className="max-w-full h-auto rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.3)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,255,0,0.2)_0%,rgba(0,0,0,0)_70%)] rounded-xl animate-[neonPulse_2s_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default LimitedEditionBanner; 