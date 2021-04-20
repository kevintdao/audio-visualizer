import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import '../firebase';
import {database, auth} from '../firebase';

let recording = false;
// will contain button that user presses once to active recording feature, and can press once more when recording is over

export function Record() {


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
        }
        recording = !recording;
    };

    return (
        <div>
            <Button onClick={recordFunc} >{buttonText}</Button>
        </div>
    )
}

// export {recording};