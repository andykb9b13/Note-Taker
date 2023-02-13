const express = require('express');
const app = express();

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {

        const newNote = {
            title,
            text,
        }

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!')
    } else {
        res.error('Error in adding tip!')
    }
})

module.exports = app;