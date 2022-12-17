const fs = require('fs');
const path = require('path');
const express = require('express');
const { exit } = require('process');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const app = express();

// IMPORTANT! Middleware needed to handle requested POST data.
app.use(express.urlencoded({ extended: false }));

const getServerTimestamp = () => {
  return Math.floor(Date.now() / 1000);
}

app.get('/', (_, res) => {
  res.send(`<h1>Welcome!</h1>
  <p>GET <b>/current-time</b> - shows current server time (as UNIX timestamp)</p>
  <p>GET <b>/form</b> - HTML form handling example to store usernames</p>
  <p>POST <b>/store-user</b> - stores username in the file</p>
  <p>GET <b>/users</b> - shows all stored usernames</p>
  <br><hr>
  <p>GET <b>/kill</b> - ⚠️ Kills ☠️ server in 5 seconds</p>
  `);
});

app.get('/form', (req, res) => {
  res.send('<form action="/store-user" method="POST"><label>Your username</label><br><input name="username" type="text"/><br><button>Submit</button></form><br><br>');
});

app.post('/store-user', (req, res) => {
  const userName = req.body.username;

  if (userName) {
    // path to file
    const usersDataFile = path.join(__dirname, 'data', 'users.json');

    // open existing user data file
    const usersData = fs.readFileSync(usersDataFile);
    // format data to JSON
    const existingUsers = JSON.parse(usersData);
    // add new username
    existingUsers.push({ userName });

    // write new JSON to file
    fs.writeFileSync(usersDataFile, JSON.stringify(existingUsers));

    res.send(`<p>Username <strong>${userName}</strong> stored!</p>`);
  } else {
    res.send('Username is not specified');
  }
});

app.get('/users', (req, res) => {
  const usersDataFile = path.join(__dirname, 'data', 'users.json');

  const usersData = fs.readFileSync(usersDataFile);
  const existingUsers = JSON.parse(usersData);

  let responseData = '<h1>All users: </h1><ul>'
  for (let user of existingUsers) {
    responseData += `<li>${user.userName}</li>`;
  }
  responseData += '</ul>'

  res.send(responseData);
});

app.get('/current-time', (req, res) => {
  res.send('Current server time: ' + getServerTimestamp());
});

app.get('/kill', (req, res) => {

  res.send('Server will be killed in 5 seconds...');

  setTimeout(() => {
    exit(1);
  }, 5000);
});

app.listen(PORT);

console.log(`Express server running on ${HOSTNAME}:${PORT}`);