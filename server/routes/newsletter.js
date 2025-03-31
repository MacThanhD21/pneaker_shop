const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// Đăng ký newsletter
router.post('/subscribe', newsletterController.subscribe);

// Hủy đăng ký newsletter
router.post('/unsubscribe', newsletterController.unsubscribe);

// Cập nhật preferences
router.put('/preferences', newsletterController.updatePreferences);

module.exports = router; 