import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import '../firebase';
import {database, auth} from '../firebase';

let recording = false;
// will contain button that user presses once to active recording feature, and can press once more when recording is over

export function Record() {

    window.downloadLink = document.getElementById('download');


    
    const [buttonText, setButtonText] = useState('Start Recording!');
    const recordFunc = () => {
        // console.log("Hey fellas you're in the recordFun");
        // console.log(recording);
        if(recording){
            setButtonText("Start Recording!");
            // console.log(username);
            var uid = auth.currentUser.uid;
            database.ref('users/' + uid ).update({isRecording: false});
        }
        else{
            setButtonText("Stop Recording");
            var uid = auth.currentUser.uid;
            database.ref('users/' + uid ).update({isRecording: true}); // will eventually update firebase to have branch for each user containing {isRecording: bool, recordings:{record1: mp3, recordk: mp3}}
        
            navigator.mediaDevices.getUserMedia({audio: true, video:false}).then( function(stream){
                    const options = {mimeType: "audio/webm"};
                    const recordedChunks = [];
                    const mediaRecorder = new MediaRecorder(stream, options);

                    mediaRecorder.addEventListener('dataavailable', function(e){
                        if ( e.data.size > 0) {
                            recordedChunks.push(e.data);
                        }
                        
                        mediaRecorder.stop();
                        console.log(mediaRecorder);
                    });

                    mediaRecorder.addEventListener('stop', function(){
                        window.downloadLink.href= URL.createObjectURL( new Blob(recordedChunks));
                        window.downloadLink.download = 'test.wav';
                    });

                    mediaRecorder.start();
//                    console.log(mediaRecorder);
                })
        }
        recording = !recording;
    };

    return (
        <div>
            <Button id="recordButton" onClick={recordFunc} >{buttonText}</Button>
        </div>
    )
}


// export {recording};