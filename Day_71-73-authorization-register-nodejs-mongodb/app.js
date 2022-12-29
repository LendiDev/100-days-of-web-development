const path = require('path');

const express = require('express');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const sessionStoreConfig = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017',
  databaseName: 'auth-demo',
  collection: 'sessions'
});

const sessionsMiddleware = session({
  secret: 'our-little-secret-wont-tell-anyone(better-to-store-in-env-tho)',
  store: sessionStoreConfig,
  resave: false,
  saveUninitialized: false,
})

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(sessionsMiddleware);

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
