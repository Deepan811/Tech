const Cart = require('../models/Cart');


const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({}); // get current cart
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    res.status(200).json(cart.products); // Send cart items  checkout
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkout };
