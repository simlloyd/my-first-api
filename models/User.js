const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
   },
   city: {
    type: String,
    required: [true, 'City is rquired'],
    trim: true
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;