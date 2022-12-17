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
  <p>GET <b>/form</b> - HTML form handling example</p>
  <p>GET <b>/kill</b> - ⚠️ Kills ☠️ server in 5 seconds</p>
  <p>POST <b>/store-user</b> - stores username in the file</p>`);
});

app.get('/form', (req, res) => {
  res.send('<form action="/store-user" method="POST"><label>Your username</label><br><input name="username" type="text"/><br><button>Submit</button></form><br><br>');
});

app.get('/kill', (req, res) => {

  res.send('Server will be killed in 5 seconds...');

  setTimeout(() => {
    exit(1);
  }, 5000);
});

app.post('/store-user', (req, res) => {
  const userName = req.body.username;

  if (userName) {
    // TODO: handle username(s) saving to the file;
    res.send(`coming soon...`);
    // res.send(`<p>Username <strong>${userName}</strong> stored!</p>`);
  } else {
    res.send('no name specified');
  }
})

app.get('/current-time', (req, res) => {
  res.send('Current server time: ' + getServerTimestamp());
});

app.listen(PORT);

console.log(`Express server running on ${HOSTNAME}:${PORT}`);