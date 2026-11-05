const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (req.url === '/hello' && req.method === 'GET') {
        res.end('Hello from GET');
    } else if (req.url === '/hello' && req.method === 'POST') {
        res.end('Hello from POST');
    } else {
        res.end('Not supported');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});