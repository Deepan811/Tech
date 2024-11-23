const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check cart  exists
    let cart = await Cart.findOne({});
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    // Check product is  in the cart
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
      
    }else{

    // Add product to the cart
    cart.products.push({
      productId,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity,
    });
  }

    await cart.save();

    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({})
      
    res.json(cart || { products: [] }); // Return empty array no cart avilble
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (cart) {
      cart.products = []; // clar products array
      await cart.save();
    }
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  
  try {
    
    let cart = await Cart.findOne({});  
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove product from cart
    cart.products = cart.products.filter((product) => product.productId.toString() !== productId);
    
    // Save cart
    await cart.save();

    res.status(200).json(cart);  // Return updat cart
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  try {
    const cart = await Cart.findOne({});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update quantity of  product
    cart.products[productIndex].quantity = quantity;

    await cart.save();
    res.status(200).json(cart.products[productIndex]); // Return the updated product
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = { addToCart, getCart,  clearCart, removeFromCart, updateQuantity };
