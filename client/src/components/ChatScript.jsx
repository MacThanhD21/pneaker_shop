import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatScript = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    if (!isAuthPage) {
      // Tạo script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = '//core.vchat.vn/code/tracking.js?v=27031';

      // Tạo biến cấu hình
      window.__vnp = {
        code: 24688,
        key: '',
        secret: '8d4d9783776363e98b046cd4110077d5'
      };

      // Thêm script vào DOM
      document.body.appendChild(script);

      // Cleanup function
      return () => {
        document.body.removeChild(script);
        delete window.__vnp;
      };
    }
  }, [location.pathname]);

  return null;
};

export default ChatScript; 