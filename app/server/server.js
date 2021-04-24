const express = require('express');
const socket = require('socket.io');
const app = express();
var sense = require("@trbll/sense-hat-led");
sense.setRotation(90);

const server = app.listen('3001', () => {
    console.log("Server running on Port 3001");
})

var io = socket(server);
var userUID;


io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    // socket.on('sendUID', (uid) => {
    //     userUID = uid;
    //     module.exports = {uid};
    // })

    socket.on('sendLEDArray', (dataArray, color) => {
        var ledColor = [];
        if(color === 'red'){
            ledColor = [255, 25, 25];
        }
        else if(color === 'green'){
            ledColor = [25, 255, 25];
        }
        else if(color === 'blue'){
            ledColor = [25, 25, 255];
        }

        var index = 0;
        for(let row = 0; row < dataArray.length; row++){
            for(let col = 0; col < dataArray.length; col++){
                if(col < dataArray[index]){
                    sense.setPixel(col, row, ledColor);
                }
                else{
                    sense.setPixel(col, row, [0, 0, 0]);
                }
            }
            index++;
        }
    })
})