import React, {Component, useState} from 'react';
import {visualize} from '../analyzer.js';

export function Visualizer() {
    return (
        <>
            <input type="file" id="file" accept="audio/*" onChange={visualize}/>
            <canvas id="canvas" width="600" height="400" style={{background: 'black'}}/>
            <audio id="audio" controls></audio>
        </>
    )
}