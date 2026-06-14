const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
   },
   email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
   },
   password: {
    type: String,
    required: [true, 'Password is required'],
   },
   city: {
    type: String,
    required: [true, 'City is rquired'],
    trim: true
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;