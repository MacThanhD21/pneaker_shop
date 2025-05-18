// First, install the reCAPTCHA package
// npm install react-google-recaptcha

// Create a ReCaptcha component (src/components/ReCaptcha.jsx)
import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Sử dụng khóa site key từ biến môi trường hoặc từ cấu hình của bạn
// Lấy site key từ Google reCAPTCHA dashboard khi bạn đăng ký reCAPTCHA v2
const RECAPTCHA_SITE_KEY = '6Lfflj4rAAAAABdU-bqLOvA5wHvwflU4Kxe3jMZs'; // Thay bằng site key thực của bạn

const Captcha = ({ onChange }) => {
  const captchaRef = useRef(null);

  const handleCaptchaChange = (token) => {
    // Khi người dùng hoàn thành captcha, gọi hàm callback với token
    onChange(token);
  };

  useEffect(() => {
    // Cleanup khi component unmount
    return () => {
      if (captchaRef.current) {
        captchaRef.current.reset();
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        ref={captchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        // Thêm các thuộc tính đặc biệt của reCAPTCHA v2 nếu cần
        size="normal" // "normal" hoặc "compact"
        theme="light" // "light" hoặc "dark"
      />
    </div>
  );
};

export default Captcha;