const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const db = require('./db/db.json');
const express = require('express');
const app = express();

const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));



//Get Requests
app.get('/api/notes', (req, res) => {
    let notes = fs.readFileSync('./db/db.json', 'utf8')
    console.log(notes);
    res.json(JSON.parse(notes));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

let a = uniqid();
console.log(a);


//Post Requests
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received!`);

    const { title, text } = req.body;

    const newNote = {
        id: uniqid(),
        title,
        text
    };

    console.log(newNote);
    db.push(newNote);


    const fixedNote = JSON.stringify(db);


    fs.writeFileSync(path.join(__dirname, './db/db.json'), fixedNote, (err) =>
        err
            ? console.error(err)
            : console.log(
                `Note has been posted!`
            )
    );
    res.json(fixedNote);
});


//DELETE requests
app.delete(`/api/notes/:id`, (req, res) => {
    const { id } = req.params;

    db.filter(note => note.id === id);


} );





//Receive PORT info
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));