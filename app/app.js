const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// routes
const index = require('./routes/index.route');
const prizes = require('./routes/prizes.route');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/prizes', prizes);


module.exports = app;