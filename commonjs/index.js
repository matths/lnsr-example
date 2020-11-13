const http = require('http');
const lnsrExample = require('./lnsr-example');

const server = http.createServer(lnsrExample);
server.listen(8000, '127.0.0.1');
