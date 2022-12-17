const express = require('express');
const path = require('path');

const defaultRouter = require('./routes/default');
const restaurantsRouter = require('./routes/restaurants');
const errorRouter = require('./routes/errors');

const PORT = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

// App routes
app.use('/', defaultRouter);
app.use('/', restaurantsRouter);
app.use('/', errorRouter);

app.listen(PORT);

console.log('Server up and running on port: ' + PORT);