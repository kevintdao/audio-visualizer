// install express, socket.io, and @trbll/sense-hat-led on the raspberry pi
// npm install express, socket.io, and @trbll/sense-hat-led

const express = require('express');
const socket = require('socket.io');
// const { firebaseApp } = require('./firebase');
const app = express();
var sense = require("@trbll/sense-hat-led");
sense.setRotation(90);

const server = app.listen('3001', () => {
    console.log("Server running on Port 3001");
})

var io = socket(server);
var userUID;

//firebaseApp();

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    // socket.on('sendUID', (uid) => {
    //     userUID = uid;
    //     module.exports = {uid};
    // })

    socket.on('sendLEDArray', (dataArray, color, instrument) => {
        var index = 0;
        for(let row = 0; row < dataArray.length; row++){
            for(let col = 0; col < dataArray.length; col++){
                if(col < dataArray[index]){
                    if(color === 'red'){
                        sense.setPixel(col, row, [255 - (26*col), 25, 25]);
                    }
                    else if(color === 'green'){
                        sense.setPixel(col, row, [25, 255 - (26*col), 25]);
                    }
                    else if(color === 'blue'){
                        sense.setPixel(col, row, [25, 25, 255 - (26*col)]);
                    }
                    else if(color === 'instrument'){
                        if(instrument === 'Guitar'){
                            sense.setPixel(col, row, [255, 50 + (7*col), 0]);
                        }
                        else if(instrument === 'Piano'){
                            sense.setPixel(col, row, [70 + (10*col), 0, 70 + (5*col)]);
                        }
                        else if(instrument === 'Trumpet'){
                            sense.setPixel(col, row, [100 + (10*col), 100 + (10*col), 0]);
                        }
                        else if(instrument === 'Violin'){
                            sense.setPixel(col, row, [0, 70 + (10*col), 70 + (10*col)]);
                        }
                    }
                }
                else{
                    sense.setPixel(col, row, [0, 0, 0]);
                }
            }
            index++;
        }
    })
})