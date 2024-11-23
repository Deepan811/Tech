const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      }, // Reference to the product in the database
      name: { 
        type: String, 
        required: true 
      }, // Name of the product
      imageUrl: { 
        type: String, 
        required: true 
      }, // Image URL of the product
      price: { 
        type: Number, 
        required: true 
      }, // Price of the product
      quantity: { 
        type: Number, 
        required: true, 
        default: 1 
      }, // Quantity of the product
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
