const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.firstName = userData.firstName || '';
    this.lastName = userData.lastName || '';
    this.phoneNumber = userData.phoneNumber || '';
    this.address = userData.address || '';
    this.city = userData.city || '';
    this.state = userData.state || '';
    this.zipCode = userData.zipCode || '';
    this.profilePhoto = userData.profilePhoto || '';
    this.dateOfBirth = userData.dateOfBirth || '';
    this.occupation = userData.occupation || '';
    this.preferredRentalType = userData.preferredRentalType || 'Any'; // Apartment, House, Room, Any
    this.maxBudget = userData.maxBudget || 0;
    this.isVerified = userData.isVerified || false;
    this.memberSince = userData.memberSince || new Date().toISOString();
    this.createdAt = userData.createdAt || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static readAll() {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static writeAll(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  }

  static findById(id) {
    const users = this.readAll();
    return users.find(user => user.id === parseInt(id));
  }

  static findByEmail(email) {
    const users = this.readAll();
    return users.find(user => user.email === email);
  }

  static findByUsername(username) {
    const users = this.readAll();
    return users.find(user => user.username === username);
  }

  save() {
    const users = User.readAll();
    const existingIndex = users.findIndex(user => user.id === this.id);
    
    if (existingIndex !== -1) {
      users[existingIndex] = this;
    } else {
      this.id = users.length + 1;
      users.push(this);
    }
    
    User.writeAll(users);
    return this;
  }
}

module.exports = User;
