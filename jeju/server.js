const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/jshigh.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jshigh.xyz/fullchain.pem')
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

https.createServer(options, app).listen(443, () => {
  console.log('✅ HTTPS 서버 실행 중: https://jshigh.xyz');
});

const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);