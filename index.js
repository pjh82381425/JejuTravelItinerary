const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '..', 'JejuTravelItinerary' , 'index.html'));
});

app.get('/place/:id', (req, res) => {
    const param = req.params
    console.log(param)
    console.log(param.id)

    res.json((param.id + " 처리 완료"))
})

server.listen(port, () => {
    console.log(`test url: http://localhost:${port}/place/1`)
})

