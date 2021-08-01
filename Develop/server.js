const fs = require('fs');
const path = require('path');
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




//Post Requests
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received!`);


    const newNote = req.body;
    const fixedNote = JSON.stringify(newNote);


    fs.writeFile(db, fixedNote, (err) =>
        err
            ? console.error(err)
            : console.log(
                `Note has been posted!`
            )
    );

});








//Receive PORT info
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));