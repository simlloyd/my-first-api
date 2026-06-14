const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { name, email, password, city } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            city
        });

        await newUser.save();
        res.json({ message: 'User registered successfully!' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login successfull!', token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = { register, login };