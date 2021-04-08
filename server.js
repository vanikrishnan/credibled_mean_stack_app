const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const wordRoute = require('./routes/word');
var cors = require('cors');
mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', err => {
    console.log(err);
})

db.once('open', () => {
    console.log("DB Connection established");
})

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' === req.method) return res.sendStatus(200);
    next();
});

const port = 3000;

app.listen(port, () => {
    console.log("Server running on port" + port)
})

app.use('/api/user', userRoute)
app.use('/api/word', wordRoute)