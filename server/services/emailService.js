const nodemailer = require('nodemailer');
const { Newsletter } = require('../models/Newsletter');

// Cấu hình email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Hàm gửi email thông báo sản phẩm mới
const sendNewProductNotification = async (product) => {
  try {
    // Lấy danh sách email đã đăng ký
    const subscribers = await Newsletter.find({ isActive: true });
    
    // Tạo nội dung email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      subject: `Sản Phẩm Mới: ${product.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #db7093;">Sản Phẩm Mới Đã Được Thêm!</h2>
          <div style="background: #fff5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #2d3436; margin: 0 0 10px 0;">${product.title}</h3>
            <p style="color: #636e72; margin: 0 0 15px 0;">${product.description?.substring(0, 150)}...</p>
            <p style="color: #db7093; font-size: 1.2em; font-weight: bold; margin: 0 0 15px 0;">
              ${product.price.toLocaleString('vi-VN')}đ
            </p>
            <a href="${process.env.CLIENT_URL}/shop/${product.id}" 
               style="display: inline-block; background: #db7093; color: white; padding: 10px 20px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
              Xem Chi Tiết
            </a>
          </div>
          <p style="color: #636e72; font-size: 0.9em;">
            Bạn nhận được email này vì đã đăng ký nhận thông báo từ Sneaker Shop.
            <br>
            <a href="${process.env.CLIENT_URL}/unsubscribe" style="color: #db7093;">
              Hủy đăng ký
            </a>
          </p>
        </div>
      `
    };

    // Gửi email cho từng người đăng ký
    const sendPromises = subscribers.map(subscriber => {
      return transporter.sendMail({
        ...mailOptions,
        to: subscriber.email
      });
    });

    await Promise.all(sendPromises);
    console.log(`Đã gửi thông báo sản phẩm mới đến ${subscribers.length} người đăng ký`);
    
  } catch (error) {
    console.error('Lỗi khi gửi email thông báo:', error);
    throw error;
  }
};

module.exports = {
  sendNewProductNotification
}; 