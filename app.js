const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Dummy user data (replace with your actual database)
const users = [];

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
