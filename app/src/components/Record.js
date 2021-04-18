import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import '../firebase';
import {database} from '../firebase';
let recording = false;

// will contain button that user presses once to active recording feature, and can press once more when recording is over

export function Record() {


    const [buttonText, setButtonText] = useState('Start Recording!');

    const recordFunc = () => {
        // console.log("Hey fellas you're in the recordFun");
        // console.log(recording);
        if(recording){
            setButtonText("Start Recording!");
            database.ref().update({isRecording: false});
        }
        else{
            setButtonText("Stop Recording");
            database.ref().update({isRecording: true});
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