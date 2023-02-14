const express = require('express');
const app = express();
const db = require('./db/db.json');
// const api = require('./routes/index');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

const path = require('path');
const { json } = require('express');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
        console.log('this is the data from the get request', JSON.parse(data));
    })
})

app.get('api/notes/:id', (req, res) => {
    console.log(req.params.id)
    if (req.params.id) {
        console.log(`${req.method} request received to get a single review`)
    }
})

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    // console.info(req.rawHeaders);
    console.info(`${req.method} request received`);
    // res.json(JSON.stringify(req.body));

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

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received`);
    if (req.params.id) {
        console.log(`${req.method} request received to delete a single review`)
        const noteId = req.params.id;
        for (let i = 0; i < db.length; i++) {
            const currentNote = db[i];
            if (currentNote.id === noteId) {
                console.log("this is current note", currentNote)
                //   splice the current note out of the db array
                db.splice(i, 1);
                console.log("this is db after splice", db);
                fs.writeFileSync('./db/db.json', JSON.stringify(db),
                    (err) => (err) ? console.log("trouble writing the file") : ("success, updated the db")
                );
            }
        }
        res.json({ message: "ok" })
    }

})


app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));