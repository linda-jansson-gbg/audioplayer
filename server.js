const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();

//Kommer också göra en ny funktion för att slippa upprepa så mycket kod.
server.on('request', (request, response) => {
    //console.log('Request: ', request.url);
    //console.log('dirname: ', __dirname);
    const fileExtension = path.extname(request.url);

    if (request.url === '/') {
        const src = fs.createReadStream('index.html');
        src.pipe(response);
    } else if (fileExtension === '.mp3') {
        const src = fs.createReadStream(__dirname + request.url);
        const stats = fs.statSync(__dirname + request.url);
        const fileSize = stats.size;
        src.on('open', () => {
            response.setHeader('Content-Type', 'audio/mpeg');
            response.setHeader('Content-Length', fileSize);
            response.setHeader('Accept-Ranges', 'bytes');
            src.pipe(response);
        });
        src.on('error', () => {
            response.end('Sidan kunde inte hittas');
        });
    } else if (fileExtension === '.css') { //Av någon anledning fick jag MIME-problem med css:en
        const src = fs.createReadStream(__dirname + request.url);
        src.on('open', () => {
            response.setHeader('Content-Type', 'text/css');
            src.pipe(response);
        });
        src.on('error', () => {
            response.end('Sidan kunde inte hittas');
        });
    } else {
        const src = fs.createReadStream(__dirname + request.url);
        src.on('open', () => {
            src.pipe(response);
        });
        src.on('error', () => {
            response.end('Sidan kunde inte hittas');
        });
    }
});

server.listen(8000);