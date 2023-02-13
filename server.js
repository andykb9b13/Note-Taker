const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})