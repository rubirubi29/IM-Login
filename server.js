const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static HTML files
app.use(express.static('public'));

// Simple user data (in memory - no database)
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Login API endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, message: 'Login successful!', username: user.username });
    } else {
        res.json({ success: false, message: 'Invalid username or password!' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available users:');
    console.log('- Username: admin, Password: admin123');
    console.log('- Username: user, Password: user123');
}); 