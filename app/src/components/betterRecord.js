import { Button } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import '../firebase';
import {database, auth} from '../firebase';

export function Record(){

    const [buttonText, setButtonText] = useState('Start!');
    const audioRef = useRef(null);

    const getAudio = () => {
        navigator.mediaDevices.getUserMedia({audio:true, video: false}).then( stream => {
            let audio = audioRef.current;
            audio.srcObject = stream;
            audio.play();
        })
        .catch(err=>{
            console.log("error: " , err);
        });
    };

    return (
        <>
                <Button onClick={getAudio}>Record</Button>
                <audio ref={audioRef} />
                <canvas />
        </>
    )


}