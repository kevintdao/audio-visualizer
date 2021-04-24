import io from "socket.io-client";
import {auth} from './firebase.js';

export const socket = io('raspberrypi.local:3001', {transports: ['websocket']});

// export const sendUID = () => {
//     socket.emit('sendUID', auth.currentUser.uid);
// }

export var ledArray = (dataArray, color) => {
    var dataArrayAvg = new Array(8);
    var sum = 0
    var index = 0;
    // get the avg for every 3 steps
    for(var i = 1; i <= dataArray.length - 8; i++){
        if(i % 3 === 0){
            var avg = Math.round(sum/(8*8));
            dataArrayAvg[index] = avg;
            sum = 0;
            index++;
        }
        else{
            sum += dataArray[i];
        }
    }

    socket.emit('sendLEDArray', dataArrayAvg, color);
}