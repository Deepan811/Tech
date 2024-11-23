const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;
  try {
    const product = new Product({ name, description, price, countInStock, imageUrl });
    await product.save();
    res.status(201).json({
      message:"product added",
      product});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct };
