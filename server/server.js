const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Replace with your local or Atlas URI)
mongoose.connect('mongodb://127.0.0.1:27017/mern_db')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// SIGN UP ROUTE
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (err) {
        res.status(400).json({ error: "Email already exists or invalid data" });
    }
});

// SIGN IN ROUTE
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login Successful", user: user.firstName });
});

app.listen(5000, () => console.log("Server running on port 5000"));