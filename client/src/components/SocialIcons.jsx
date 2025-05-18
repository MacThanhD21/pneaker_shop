import React from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="fixed left-5 bottom-5 z-50">
      <div className="flex flex-col gap-4">
        <a
          href="https://zalo.me/0982316213"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 animate-pulse"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
              alt="Zalo" 
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a
          href="https://www.facebook.com/messages/t/9655098721212054"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50"
        >
          <FaFacebookMessenger size={32} className="text-[#0084FF]" />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons; 

