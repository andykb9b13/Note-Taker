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
    res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);

    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNote, './db/db.json');
    } else {
        res.error('Error in adding tip!');
    }
})

app.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received`);
    if (req.params.id) {
        console.log(`${req.method} request received to delete a single review`)
        const noteId = req.params.id;
        console.log("this is the note id", noteId);
        const newDb = db.filter(note => note.id !== noteId);
        console.log("This is filtered newDb", newDb)
        fs.writeFileSync('./db/db.json', JSON.stringify(newDb),
            (err) => (err) ? console.log("trouble writing the file") : ("success, updated the db")
        );
        // for (let i = 0; i < db.length; i++) {
        //     const currentNote = db[i];
        //     console.log("this is the current note", currentNote)
        //     if (currentNote.id === noteId) {
        //         console.log("this is current note", currentNote)
        //         db.splice(i, 1);
        //         console.log("this is db after splice", db);
        //         fs.writeFileSync('./db/db.json', JSON.stringify(db),
        //             (err) => (err) ? console.log("trouble writing the file") : ("success, updated the db")
        //         );
        //     }
        // }
        res.json({ message: "ok" });
    }

})

module.exports = app;