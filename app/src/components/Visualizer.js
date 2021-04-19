import React, {Component, useState} from 'react';
import {visalizerInit, setAudioOn, setAudioOff} from '../analyzer.js';

export function Visualizer() {
    return (
        <>
            <input type="file" id="file" accept="audio/*" onChange={visalizerInit}/>
            <canvas id="canvas" width="800" height="400" style={{background: 'black'}}/>
            <audio id="audio" controls onPause={setAudioOff} onPlay={setAudioOn}></audio>
        </>
    )
}