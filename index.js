const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render("index.ejs");
});

app.post('/', async (req, res) => {
    try {
        const type = req.body.type;
        const response = await axios.get(`https://http.dog/${type}.jpg`);
        const imageUrl = response.data;
        res.render('index.ejs', { imageUrl });
    } catch (error) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs', { 
            error: 'Failed to fetch dog image',
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
