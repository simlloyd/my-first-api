require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch((error) => {
        console.log('Connection failed:', error)
    });


app.get('/', (req, res) => {
    res.send('Hello! My server is working!');
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'User saved!', user: newUser });
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted!' });
});

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true })
    res.json({ message: 'User updated!', user: user });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});