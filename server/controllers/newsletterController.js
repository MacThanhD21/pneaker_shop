const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');

// Cấu hình nodemailer (cần thay thế bằng thông tin thực)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const newsletterController = {
  // Đăng ký newsletter
  subscribe: async (req, res) => {
    try {
      const { email } = req.body;

      // Kiểm tra email đã tồn tại
      const existingSubscriber = await Newsletter.findOne({ email });
      if (existingSubscriber) {
        if (existingSubscriber.status === 'unsubscribed') {
          // Nếu đã unsubscribe trước đó, cập nhật lại status
          existingSubscriber.status = 'active';
          await existingSubscriber.save();
          return res.status(200).json({
            success: true,
            message: 'Đăng ký lại thành công!'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Email này đã đăng ký nhận tin!'
        });
      }

      // Tạo subscriber mới
      const newSubscriber = new Newsletter({ email });
      await newSubscriber.save();

      // Gửi email xác nhận
      await sendWelcomeEmail(email);

      res.status(201).json({
        success: true,
        message: 'Đăng ký nhận tin thành công!'
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
      });
    }
  },

  // Hủy đăng ký newsletter
  unsubscribe: async (req, res) => {
    try {
      const { email } = req.body;

      const subscriber = await Newsletter.findOne({ email });
      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy email trong danh sách!'
        });
      }

      subscriber.status = 'unsubscribed';
      await subscriber.save();

      res.status(200).json({
        success: true,
        message: 'Hủy đăng ký thành công!'
      });
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
      });
    }
  },

  // Cập nhật preferences
  updatePreferences: async (req, res) => {
    try {
      const { email, preferences } = req.body;

      const subscriber = await Newsletter.findOne({ email });
      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy email trong danh sách!'
        });
      }

      subscriber.preferences = { ...subscriber.preferences, ...preferences };
      await subscriber.save();

      res.status(200).json({
        success: true,
        message: 'Cập nhật tùy chọn thành công!'
      });
    } catch (error) {
      console.error('Update preferences error:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
      });
    }
  }
};

// Hàm gửi email chào mừng
const sendWelcomeEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Chào mừng bạn đến với Sneaker Shop Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #db7093;">Chào mừng bạn đến với Sneaker Shop! 👟</h2>
          <p>Cảm ơn bạn đã đăng ký nhận tin từ chúng tôi.</p>
          <p>Bạn sẽ nhận được những thông tin mới nhất về:</p>
          <ul>
            <li>Sản phẩm mới</li>
            <li>Khuyến mãi đặc biệt</li>
            <li>Sự kiện độc quyền</li>
          </ul>
          <p>Nếu bạn muốn cập nhật tùy chọn nhận tin hoặc hủy đăng ký, vui lòng truy cập website của chúng tôi.</p>
          <div style="margin-top: 20px; padding: 10px; background-color: #f8f8f8; border-radius: 5px;">
            <small>Email này được gửi tự động, vui lòng không trả lời.</small>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Send welcome email error:', error);
  }
};

module.exports = newsletterController; 