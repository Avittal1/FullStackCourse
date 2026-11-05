const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`You used method: ${req.method}`);
});

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});