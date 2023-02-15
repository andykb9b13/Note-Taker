const express = require('express');
const app = express();
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
        console.log('this is the data from the get request', JSON.parse(data));
    })
})

app.get('/notes/:id', (req, res) => {
    console.log(req.params.id)
    if (req.params.id) {
        console.log(`${req.method} request received to get a single review`)
    }
})

app.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNote, './db/db.json');
        res.json(`${req.method} request received`);
    } else {
        res.error('Error in adding note!');
    }
})

app.delete('/notes/:id', (req, res) => {
    if (req.params.id) {
        const noteId = req.params.id;
        const newDb = db.filter(note => note.id !== noteId);
        console.log("This is filtered newDb", newDb);
        fs.writeFileSync('./db/db.json', JSON.stringify(newDb),
            (err) => (err) ? console.log("trouble writing the file") : ("success, updated the db")
        );
        res.json({ message: "ok" });
    }
})

module.exports = app;