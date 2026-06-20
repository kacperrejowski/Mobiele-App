const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// 1. Setup template engine and static folders
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 2. Define ALL your routes here (DO NOT put app.listen inside these!)
app.get('/', (req, res) => {
    res.render('index'); // Assuming you have an index.ejs
});

app.get('/bmicalculator', (req, res) => {
    res.render('bmicalculator'); 
});

app.get('/recepten', (req, res) => {
    res.render('recepten'); // Assuming you have a recepten.ejs
});


// 3. START THE SERVER (Only ONCE, at the very bottom!)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/bmicalculator`);
    console.log(`http://localhost:${PORT}/`);
    console.log(`http://localhost:${PORT}/recepten`);
});