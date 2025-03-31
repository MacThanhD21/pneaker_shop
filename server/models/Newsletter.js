const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  lastEmailSent: {
    type: Date
  },
  preferences: {
    newProducts: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    events: {
      type: Boolean,
      default: true
    }
  }
});

// Middleware để kiểm tra email trước khi lưu
newsletterSchema.pre('save', function(next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    next(new Error('Email không hợp lệ'));
  }
  next();
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter; 