import { Button } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import '../firebase';
import {database, auth} from '../firebase';
import {visalizerInitForRecord} from '../analyzer.js';


export function Record(){
    let shouldStop = false;
    let stopped = false;

    const stopButton = () => {
        shouldStop = true;
    };

    const getAudio = () => {
        shouldStop = false;
        stopped = false;

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
                const url = URL.createObjectURL(newObj);
                downloadLink.href =  url;
                downloadLink.download = 'input-from-mic.wav';

                
                sessionStorage.setItem('file', url);

                visalizerInitForRecord();
                // const file = document.getElementById('file');
                
                // file.value = sessionStorage.getItem('file');
              });
          
            // mediaRecorder.start(1000);

    });
    }
    return (
        <>
                <Button id="start" onClick={getAudio} variant='success' style={{marginLeft: '10px', marginRight: '10px'}}>Start</Button>
                <Button id="stop" onClick={stopButton} variant='danger' style={{marginLeft: '10px', marginRight: '10px'}}>Stop</Button>
        </>
    );

}