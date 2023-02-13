const express = require('express');
const app = express();
const db = require('./db/db.json');

const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('*', (req, res) => {
    res.send("This route doesn't exist");
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})