const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen('3001', () => {
    console.log("Server running on Port 3001");
})

var io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
})