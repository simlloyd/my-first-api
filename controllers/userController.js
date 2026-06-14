const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
    
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: 'User saved!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
     
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(id, updatedData, { returnDocument: 'after' });
        res.json({ message: 'User updated!', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or something went wrong', error: error.message });
    }
    
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or something went wrong', error: error.message });
    }
    
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };