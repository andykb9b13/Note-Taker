const express = require('express');
const app = express();
const db = require('./db/db.json');
const api = require('./routes/index');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

const path = require('path');
const { json } = require('express');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));