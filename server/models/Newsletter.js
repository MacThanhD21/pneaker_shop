const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastNotified: {
    type: Date,
    default: null
  }
});

// Middleware để validate email trước khi lưu
newsletterSchema.pre('save', function(next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    next(new Error('Email không hợp lệ'));
  }
  next();
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = { Newsletter }; 