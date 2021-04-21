import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import {setAudioOn, setAudioOff, colorRed, colorBlue, colorGreen} from '../analyzer.js';

export function Visualizer() {
    window.color = 'red';

    return (
        <>
            <canvas id="canvas" 
                width={window.innerWidth}
                height={window.innerHeight/1.5}
                style={{width: '100%', 
                        height: '100%',
                        border: 'solid 1px #DEE2E6',
                        borderRadius: '5px',
                        margin: '10px',
                        display: 'flex'
                        }}/>
            <div id="waveColorButton" style={{justifyContent: 'center', display: 'flex', margin: '10px'}}>
                <ButtonGroup>
                    <Button variant='dark' style={{background: 'red'}} onClick={colorRed}>Red</Button>
                    <Button variant='dark' style={{background: 'blue'}} onClick={colorBlue}>Blue</Button>
                    <Button variant='dark' style={{background: 'green'}} onClick={colorGreen}>Green</Button>
                </ButtonGroup>
            </div>
        </>
    )
}