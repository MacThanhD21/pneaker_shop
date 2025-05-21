const { Newsletter } = require('../../models/Newsletter');
const { sendNewProductNotification } = require('../../services/emailService');

const newsletterResolvers = {
  Mutation: {
    subscribeNewsletter: async (_, { email }) => {
      try {
        // Kiểm tra email đã tồn tại chưa
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
          if (existingSubscriber.isActive) {
            throw new Error('Email này đã được đăng ký trước đó');
          }
          // Nếu đã tồn tại nhưng không active, cập nhật lại
          existingSubscriber.isActive = true;
          await existingSubscriber.save();
          return existingSubscriber;
        }

        // Tạo subscriber mới
        const subscriber = new Newsletter({ email });
        await subscriber.save();
        return subscriber;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    unsubscribeNewsletter: async (_, { email }) => {
      try {
        const subscriber = await Newsletter.findOne({ email });
        if (!subscriber) {
          throw new Error('Email này chưa được đăng ký');
        }

        subscriber.isActive = false;
        await subscriber.save();
        return subscriber;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

// Hàm gửi thông báo khi có sản phẩm mới
const notifyNewProduct = async (product) => {
  try {
    await sendNewProductNotification(product);
    
    // Cập nhật thời gian thông báo cuối cùng
    await Newsletter.updateMany(
      { isActive: true },
      { lastNotified: new Date() }
    );
  } catch (error) {
    console.error('Lỗi khi gửi thông báo sản phẩm mới:', error);
  }
};

module.exports = {
  newsletterResolvers,
  notifyNewProduct
}; 