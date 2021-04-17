import { Button } from 'react-bootstrap'
import React, { useState } from 'react'

let recording = false;

// will contain button that user presses once to active recording feature, and can press once more when recording is over

export function Record() {


    const [buttonText, setButtonText] = useState('Start Recording!');

    const recordFunc = () => {
        // console.log("Hey fellas you're in the recordFun");
        console.log(recording);
        if(recording){
            setButtonText("Start Recording!");

        }
        else{
            setButtonText("Stop Recording");
        }
        recording = !recording;
    };

    return (
        <div>
            <Button onClick={recordFunc} >{buttonText}</Button>

        </div>
    )
}

export {recording};