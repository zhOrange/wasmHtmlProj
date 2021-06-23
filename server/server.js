const fs = require('fs')

// https证书
const credentials = {
    key: fs.readFileSync("./ssl/10.101.251.92-key.pem"),
    cert: fs.readFileSync("./ssl/10.101.251.92.pem")
}

const express = require('express')
const app = express()
app.use(express.static('../'))

// 提供https服务
const server = require('https').Server(credentials, app);

const SERVER_PORT = process.env.PORT || 443;
server.listen(SERVER_PORT, function() {
    console.log('Server is listening on ', SERVER_PORT)
});