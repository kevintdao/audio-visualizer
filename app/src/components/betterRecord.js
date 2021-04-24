import { Button } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import '../firebase';
import {database, auth} from '../firebase';



export function Record(){
    let shouldStop = false;
    let stopped = false;

    const stopButton = () => {
        shouldStop = true;
    };

    const getAudio = () => {

        const recordedChunks = [];
        const options = {mimeType: 'audio/webm'};
        navigator.mediaDevices.getUserMedia({audio:true, video: false}).then( stream => {
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.start(1000);
            mediaRecorder.ondataavailable = function(e) {
                if (e.data.size > 0) {
                    console.log(e.data.size);
                    recordedChunks.push(e.data);
                  }
                if(shouldStop === true && stopped === false) {
                    mediaRecorder.stop();
                    stopped = true;
                }
            };
            mediaRecorder.addEventListener('stop', function() {
                const downloadLink = document.getElementById('download');
                var newObj = new Blob(recordedChunks);
                downloadLink.href =  URL.createObjectURL(newObj);
                downloadLink.download = 'input-from-mic.wav';
              });
          
            // mediaRecorder.start(1000);

    });
    }
    return (
        <>
                <Button onClick={getAudio}>Start Record</Button>
                <Button onClick={stopButton}>Stop Recording</Button>

        </>
    );

}