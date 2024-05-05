const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use expressLayouts
app.use(expressLayouts);

// Serve static files from public directory
app.use(express.static('public'));

// Render landing page for root URL
app.get('/', (req, res) => {
    res.render('home', { title: 'Home', layout: 'home' });
});

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home', layout: 'home' });
});

// Other routes
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home', layout: 'home' });
});

app.get('/accecories', (req, res) => {
    res.render('accecories', { title: 'Accecories', layout: 'accecories' });
});

app.get('/profile', (req, res) => {
    res.render('profile', { title: 'profile', layout: 'profile' });
});

app.get('/Register', (req, res) => {
    res.render('Register', { title: 'Register', layout: 'Register' });
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About', layout: 'home' });
});

app.get('/ourBooks', (req, res) => {
    res.render('ourBooks', { title: 'Our Books', layout: 'ourBooks' });
});

app.get('/search', (req, res) => {
    res.render('search', { title: 'Search', layout: 'search' });
});

app.get('/trolley', (req, res) => {
    res.render('trolley', { title: 'Trolley', layout: 'trolley' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
