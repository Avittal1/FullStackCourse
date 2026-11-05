const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('JSON accepted');
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Unsupported request');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});