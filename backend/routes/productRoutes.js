const express = require('express'); 
const { getProducts, createProduct } = require('../controllers/productController'); 
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router(); 
router.get('/get', getProducts); 
router.post('/create', protect, createProduct); 
module.exports = router;