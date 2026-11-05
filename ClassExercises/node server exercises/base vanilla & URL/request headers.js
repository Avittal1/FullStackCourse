const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(req.headers, null, 2));
});

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});