import { Button } from 'react-bootstrap';
import React from 'react';
import '../firebase';
import {auth, storage} from '../firebase';
import {visalizerInitForRecord} from '../analyzer.js';
import {listen, stop} from '../tensorflow.js';

export function Record(){
    let shouldStop = false;
    let stopped = false;
    let files = [];
    var uid = auth.currentUser.uid;

    async function uploadFile(fileName, blob){
        const currentFile = await storage.child('users/' + uid  + '/' + fileName + '.wav').put(blob);
        const downloadURL = await currentFile.ref.getDownloadURL();
        files.push(downloadURL);

        displayLinks(fileName);
        visalizerInitForRecord();
    }

    function displayLinks(fileName){
        window.downloadLinks = document.getElementById('downloadLinks');
        let childCount = window.downloadLinks.childElementCount;
        for(let i = 0; i < files.length; i++){
            if(i === childCount){
                window.downloadLinks.appendChild(document.createElement("div"));
                window.downloadLinks.childNodes[i].appendChild(document.createElement('a'));
                
                window.downloadLinks.childNodes[i].childNodes[0].setAttribute('href', files[i]);
                window.downloadLinks.childNodes[i].childNodes[0].innerHTML = fileName;
            }
        }
    }

    const stopButton = () => {
        shouldStop = true;
        stop();
    };

    const getAudio = () => {
        shouldStop = false;
        stopped = false;
        const recordedChunks = [];
        const options = {mimeType: 'audio/webm'};
        let fileName;
        navigator.mediaDevices.getUserMedia({audio:true, video: false}).then( stream => {
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.start(1000);
            mediaRecorder.ondataavailable = function(e) {
                if (e.data.size > 0) {
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
                var date = new Date();
                fileName = 'input-from-mic' + date.getHours() + date.getMinutes() + date.getSeconds();

                uploadFile(fileName, newObj);
            });
              
            // mediaRecorder.start(1000);
            listen();
    });
    }
    
    return (
        <>
            <Button id="start" onClick={getAudio} variant='success' style={{marginLeft: '10px', marginRight: '10px'}}>Start</Button>
            <Button id="stop" onClick={stopButton} variant='danger' style={{marginLeft: '10px'}}>Stop</Button>
        </>
    );

}