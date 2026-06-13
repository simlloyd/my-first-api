const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://businesssimlloyd_db_user:SeparesSimlloyd1012@first-cluster.qfp9rzd.mongodb.net/myfirstapi-db?appName=First-Cluster')
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

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});