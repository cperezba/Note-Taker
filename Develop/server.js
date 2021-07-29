const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const PORT = 3001;



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(db);
    console.log(typeof db);
    console.log(db);
    // readFr.omFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received!`);
});



app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));