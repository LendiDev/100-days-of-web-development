const http = require('http');

const getServerTimestamp = () => {
  return Math.floor(Date.now() / 1000);
}

const requestHandler = (req, res) => {
  if (req.url === '/current-time') {
    res.statusCode = 200; 
    res.end('Current server time: ' + getServerTimestamp());
  } else if (req.url === '/') {
    res.statusCode = 200; 
    res.end('<h1>Welcome!</h1><p>GET <b>/current-time</b> - shows current server time (as UNIX timestamp)</p>');
  } else {
    res.statusCode = 404;
    res.end('Path doesn\'t exist');
  }
}

const server = http.createServer(requestHandler);

server.listen(3000);