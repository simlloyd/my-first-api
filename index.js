require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

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

app.use('/users', userRoutes);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});