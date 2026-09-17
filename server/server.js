// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB (Replace with your local or Atlas URI)
// mongoose.connect('mongodb://127.0.0.1:27017/mern_db')
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));

// // SIGN UP ROUTE
// app.post('/api/signup', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ firstName, lastName, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: "User Created Successfully" });
//     } catch (err) {
//         res.status(400).json({ error: "Email already exists or invalid data" });
//     }
// });

// // SIGN IN ROUTE
// app.post('/api/signin', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     res.json({ message: "Login Successful", user: user.firstName });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = 'your_super_secret_key_123'; // Store in .env in production

mongoose.connect('mongodb://127.0.0.1:27017/mern_db')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// SIGN UP ROUTE
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validation Checks
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format. Must contain @" });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                error: "Password must be at least 8 characters long and contain at least one number and one special character." 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User Created Successfully! Please Sign In." });
    } catch (err) {
        res.status(500).json({ error: "Server error during registration" });
    }
});

// SIGN IN ROUTE
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            message: "Login Successful", 
            token,
            user: { firstName: user.firstName, lastName: user.lastName, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ error: "Server error during sign in" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));