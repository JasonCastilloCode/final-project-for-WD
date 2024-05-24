const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS, client-side JavaScript, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render("index.ejs");
});

app.post('/facts', async (req, res) => {
    try {
        const limit = req.body.type;
        const response = await axios.get(`https://dogapi.dog/api/v2/facts?limit=${limit}`);
        const result = response.data;
        res.render('index.ejs', { data: result});
    } catch (error) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs', { 
            error: 'Failed to fetch dog information',
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});