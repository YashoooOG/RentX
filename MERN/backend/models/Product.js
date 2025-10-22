const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

class Product {
  constructor(productData) {
    this.id = productData.id;
    this.name = productData.name;
    this.images = productData.images || [];
    this.price = productData.price;
    this.rate_unit = productData.rate_unit || 'per_day';
    this.category = productData.category;
    this.seller = productData.seller;
    this.userId = productData.userId;
    this.location = productData.location;
    this.condition = productData.condition || 'Used';
    this.availability = productData.availability || 'Available';
    this.deposit = productData.deposit || 0;
    this.min_rental_days = productData.min_rental_days || 1;
    this.max_rental_days = productData.max_rental_days || 30;
    this.description = productData.description;
    this.posted_at = productData.posted_at || new Date().toISOString();
  }

  static readAll() {
    try {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static writeAll(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  }

  static findById(id) {
    const products = this.readAll();
    return products.find(product => product.id === parseInt(id));
  }

  static findByUserId(userId) {
    const products = this.readAll();
    return products.filter(product => product.userId === parseInt(userId));
  }

  save() {
    const products = Product.readAll();
    const existingIndex = products.findIndex(product => product.id === this.id);
    
    if (existingIndex !== -1) {
      products[existingIndex] = this;
    } else {
      this.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      products.push(this);
    }
    
    Product.writeAll(products);
    return this;
  }
}

module.exports = Product;
