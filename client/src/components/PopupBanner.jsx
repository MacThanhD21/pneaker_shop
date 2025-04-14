import React, { useState, useEffect } from 'react';

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const banners = [
    {
      id: 1,
      type: "sale",
      title: "SIÊU DEAL SNEAKER",
      mainTitle: "SALE CỰC CHẤT",
      subtitle: "CHỈ TRONG TUẦN NÀY!",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      discount: 50,
      buttons: [
        { text: "Mua ngay", icon: "🔥" },
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-red-600 to-red-900",
        textColor: "#fff",
        accentColor: "bg-red-600"
      }
    },
    {
      id: 2,
      type: "summer",
      title: "NEW ARRIVAL",
      mainTitle: "BỘ SƯU TẬP MÙA HÈ",
      subtitle: "Khám phá bộ sưu tập mới",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
      buttons: [
        { text: "Đến ngay", icon: "👟" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-blue-400 to-blue-600",
        textColor: "#fff",
        accentColor: "bg-blue-500"
      }
    },
    {
      id: 3,
      type: "limited",
      title: "LIMITED EDITION",
      mainTitle: "PHIÊN BẢN GIỚI HẠN",
      subtitle: "Sở hữu phiên bản giới hạn",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
      buttons: [
        { text: "Săn ngay", icon: "⚡" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-green-400 to-green-600",
        textColor: "#fff",
        accentColor: "bg-green-500"
      }
    },
    {
      id: 4,
      type: "trending",
      title: "HOT TREND",
      mainTitle: "PHONG CÁCH THỜI THƯỢNG",
      subtitle: "🔥 Trending | ❤️ Loved by 10K+ sneakerheads",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      buttons: [
        { text: "Khám phá ngay", icon: "🔥" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-red-400 to-orange-400",
        textColor: "#fff",
        accentColor: "bg-red-400"
      }
    },
    {
      id: 5,
      type: "world",
      title: "WALK THE WORLD",
      mainTitle: "KHÁM PHÁ MỌI HÀNH TRÌNH",
      subtitle: "Mỗi bước chân là một chuyến phiêu lưu",
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop",
      buttons: [
        { text: "Mua ngay", icon: "🌍" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-indigo-800 to-orange-600",
        textColor: "#fff",
        accentColor: "bg-orange-600"
      }
    },
    {
      id: 6,
      type: "tech",
      title: "SNEAKER TECH",
      mainTitle: "ĐỈNH CAO CÔNG NGHỆ",
      subtitle: "Công nghệ đệm khí mới - Nhẹ hơn, Êm hơn, Chất hơn",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
      techIcons: ["🤖", "🧠", "⚡"],
      buttons: [
        { text: "Khám phá ", icon: "🧬" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-gray-700 to-blue-600",
        textColor: "#fff",
        accentColor: "bg-blue-600"
      }
    },
    {
      id: 7,
      type: "custom",
      title: "CUSTOM SNEAKER",
      mainTitle: "CÁ TÍNH RIÊNG CỦA BẠN",
      subtitle: "Tự thiết kế đôi giày của chính bạn",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
      buttons: [
        { text: "Tùy chỉnh ngay", icon: "🎨" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-pink-500 to-indigo-600",
        textColor: "#fff",
        accentColor: "bg-pink-500"
      }
    },
    {
      id: 8,
      type: "street",
      title: "STREET STYLE",
      mainTitle: "PHONG CÁCH ĐƯỜNG PHỐ",
      subtitle: "Chất ngầu từng bước chân",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      socialIcons: ["📸", "🎥", "📱"],
      buttons: [
        { text: "Xem ngay", icon: "👟" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-yellow-400 to-red-700",
        textColor: "#fff",
        accentColor: "bg-yellow-400"
      }
    },
    {
      id: 9,
      type: "flash",
      title: "FLASH SALE",
      mainTitle: "THỜI GIAN GIỚI HẠN",
      subtitle: "GIẢM GIÁ TRONG 24 GIỜ - MUA NGAY KẺO LỠ!",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      discount: 50,
      buttons: [
        { text: "Đặt ngay", icon: "⏱️" }
      ],
      theme: {
        background: "#1a1a1a",
        gradient: "from-red-700 to-red-500",
        textColor: "#fff",
        accentColor: "bg-red-700"
      }
    }
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfWeek = new Date();
      endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);
      
      const difference = endOfWeek - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Auto slide every 5 seconds
    const slideTimer = setInterval(() => {
      if (!isClosing) {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(slideTimer);
    };
  }, [isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  const currentBanner = banners[currentSlide];

  return (
    <>
      {/* Font imports can be handled in your global CSS or via Tailwind config */}
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1000]">
        <div className={`w-full max-w-[700px] h-[400px] relative rounded-xl overflow-hidden bg-gray-900 shadow-lg shadow-red-900/30 ${isClosing ? 'animate-slide-out' : 'animate-slide-in'} sm:w-[90%] sm:min-h-[500px]`}>
          <button 
            onClick={handleClose}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white bg-opacity-20 border-none text-white text-xl flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:bg-red-600 hover:rotate-90"
          >
            ×
          </button>
          
          <div className="flex h-full relative overflow-hidden sm:flex-col">
            {banners.map((banner, index) => (
              <div 
                key={banner.id}
                className={`absolute inset-0 flex transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                <div className="flex-1 relative overflow-hidden flex items-center justify-center perspective-1000">
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.theme.gradient} opacity-80 animate-flame`}></div>
                  
                  <img 
                    src={banner.image} 
                    alt={banner.mainTitle}
                    className="max-w-[90%] max-h-[90%] object-contain -rotate-[15deg] filter drop-shadow-2xl z-[2] transition-all duration-500 ease-in-out animate-rotate-in hover:scale-105"
                  />
                  
                  {banner.type === "sale" && (
                    <div className="absolute top-5 right-5 bg-red-600 text-white p-4 rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold shadow-lg shadow-red-600/50 z-[3] animate-flame font-sans">
                      <span className="text-xs uppercase tracking-wider">SALE</span>
                      <div className="text-2xl leading-none my-0.5 font-black">{banner.discount}%</div>
                      <span className="text-xs uppercase tracking-wider">OFF</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-8 flex flex-col justify-center items-center bg-black text-white font-sans animate-zoom-in">
                  <div className={`${banner.theme.accentColor} text-white py-1 px-4 rounded-full text-sm font-bold mb-2 uppercase tracking-wider`}>
                    {banner.title}
                  </div>
                  
                  <h2 className={`text-3xl font-black m-0 text-center bg-gradient-to-r ${banner.theme.gradient} bg-clip-text text-transparent uppercase tracking-wider animate-fade-in sm:text-2xl`}>
                    {banner.mainTitle}
                  </h2>
                  
                  <p className={`text-lg ${banner.theme.accentColor.replace('bg-', 'text-')} my-2 font-medium animate-fade-in sm:text-base`}>
                    {banner.subtitle}
                  </p>
                  
                  {banner.type === "tech" && (
                    <div className="flex gap-2 text-2xl">
                      {banner.techIcons.map((icon, i) => (
                        <span key={i}>{icon}</span>
                      ))}
                    </div>
                  )}
                  
                  {banner.type === "street" && (
                    <div className="flex gap-4 my-2 text-2xl">
                      {banner.socialIcons.map((icon, i) => (
                        <span key={i}>{icon}</span>
                      ))}
                    </div>
                  )}
                  
                  {banner.type === "sale" && (
                    <div className="flex gap-2 my-5 items-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-red-600 text-white py-1 px-2 rounded min-w-[40px] text-center text-xl font-bold">
                          {timeLeft.days.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Ngày</div>
                      </div>
                      
                      <div className="text-xl font-bold text-red-600">:</div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-red-600 text-white py-1 px-2 rounded min-w-[40px] text-center text-xl font-bold">
                          {timeLeft.hours.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Giờ</div>
                      </div>
                      
                      <div className="text-xl font-bold text-red-600">:</div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-red-600 text-white py-1 px-2 rounded min-w-[40px] text-center text-xl font-bold">
                          {timeLeft.minutes.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Phút</div>
                      </div>
                      
                      <div className="text-xl font-bold text-red-600">:</div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-red-600 text-white py-1 px-2 rounded min-w-[40px] text-center text-xl font-bold">
                          {timeLeft.seconds.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Giây</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-5 animate-fade-in sm:flex-col sm:w-full">
                    {banner.buttons.map((button, i) => (
                      <button 
                        key={i}
                        className={`${banner.theme.accentColor} text-white py-3 px-8 rounded-full font-bold cursor-pointer transition-all duration-300 border-none text-sm flex items-center justify-center gap-2 min-w-[150px] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg sm:w-full`}
                        onClick={() => window.location.href = '/products'}
                      >
                        <span>{button.text}</span>
                        {button.icon && <span className="text-base">{button.icon}</span>}
                      </button>
                    ))}
                    
                    <button 
                      onClick={handleClose}
                      className="bg-transparent text-gray-500 py-3 px-5 rounded-full font-bold cursor-pointer transition-all duration-300 border border-gray-700 text-sm flex items-center justify-center whitespace-nowrap hover:bg-white hover:bg-opacity-10 hover:border-gray-500 sm:w-full"
                    >
                      Để sau
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 ${
                  index === currentSlide 
                    ? currentBanner.theme.accentColor 
                    : 'bg-white bg-opacity-30'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupBanner;