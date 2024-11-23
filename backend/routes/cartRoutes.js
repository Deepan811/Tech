const express = require('express'); 
const { getCart, addToCart, clearCart, removeFromCart, updateQuantity  } = require('../controllers/cartController'); 

const router = express.Router(); 
router.get('/getpro', getCart); 
router.post('/addpro',  addToCart); 
router.delete('/clear', clearCart);
router.delete('/removepro/:productId', removeFromCart);
router.put('/updatequantity/:productId', updateQuantity);
module.exports =router;