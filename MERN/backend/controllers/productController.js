const Product = require('../models/Product');

const createProduct = (req, res) => {
  try {
    const productData = req.body;
    
    const newProduct = new Product(productData);
    newProduct.save();

    res.status(201).json({ 
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserProducts = (req, res) => {
  try {
    const { userId } = req.params;
    const products = Product.findByUserId(parseInt(userId));
    
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllProducts = (req, res) => {
  try {
    const products = Product.readAll();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProduct = (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    
    const products = Product.readAll();
    const productIndex = products.findIndex(p => p.id === parseInt(productId));
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product
    products[productIndex] = { ...products[productIndex], ...updateData };
    Product.writeAll(products);

    res.status(200).json({ 
      message: 'Product updated successfully',
      product: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createProduct, getUserProducts, getAllProducts, updateProduct };
