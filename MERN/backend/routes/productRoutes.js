const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// @desc    Get all products
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/products.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileData);
    res.json({ products: data });
  } catch (error) {
    console.error('Error reading products file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create new product
// @route   POST /api/products
router.post('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/products.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileData);
    
    const maxId = Math.max(...data.map(p => p.id), 0);
    const newId = maxId + 1;
    
    const newProduct = {
      id: newId,
      ...req.body,
      posted_at: new Date().toISOString()
    };
    
    data.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log('New product created with ID:', newId);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;