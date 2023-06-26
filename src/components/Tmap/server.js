/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');

const app = express();
// const webSocket = require('./socket');
// const http = require('http');
// const server = http.createServer(app);
const port = 3000;

// 정적 파일들이 있는 디렉토리 설정
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    // console.log(`Server is running at http://localhost:${port}`);
});

// webSocket(server, app)