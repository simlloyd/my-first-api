const express = require('express');
const app = express();

app.use(express.json());

const users = [
        { id: 1, name: 'Bossing Sim', city: 'Mindanao' },
        { id: 2, name: 'juan dela Cruz', city: 'Manila' },
        { id: 3, name: 'Maria Santos', city: 'Cebu'}
    ]

app.get('/', (req, res) => {
    res.send('Hello! Nodemon is watching me!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page!')
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.json({ message: 'User added!', user: newUser });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});