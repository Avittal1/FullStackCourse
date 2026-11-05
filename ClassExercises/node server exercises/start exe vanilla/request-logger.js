const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`HTTP Version: ${req.httpVersion}`);

    res.end('Request logged successfully');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});