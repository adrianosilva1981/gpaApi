
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// routes
const index = require('./routes/index');
// const authRoute = require('./routes/auth');
// const notifyRoute = require('./routes/notify');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/', index);


module.exports = app;