import React from 'react';
import {visalizerInit, setAudioOn, setAudioOff} from '../analyzer.js';

export function Visualizer() {
    return (
        <>
            <canvas id="canvas" 
                width={window.innerWidth}
                height={window.innerHeight/1.5}
                style={{width: '100%', 
                        height: '100%',
                        border: 'solid 1px #DEE2E6',
                        borderRadius: '5px',
                        marginTop: '10px',
                        marginBottom: '10px'}}/>
            <audio id="audio" 
                controls
                onPause={setAudioOff} 
                onPlay={setAudioOn} 
                style={{width: '100%'}}/>
        </>
    )
}