const express = require('express');
const { checkout } = require('../controllers/checkoutController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getcheck', protect, checkout); // Protected route to fetch checkout data
module.exports = router;
