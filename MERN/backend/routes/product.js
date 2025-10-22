const express = require('express');
const { createProduct, getUserProducts, getAllProducts, updateProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct);
router.get('/user/:userId', getUserProducts);
router.get('/', getAllProducts);
router.put('/:productId', updateProduct);

module.exports = router;
