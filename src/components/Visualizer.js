import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import {colorRed, colorBlue, colorGreen, colorInstrument} from '../analyzer.js';

export function Visualizer() {
    window.color = 'red';

    return (
        <>
            <canvas id="canvas" 
                width={window.innerWidth}
                height={window.innerHeight/1.5}
                style={{width: '50%', 
                        height: '50%',
                        display: 'flex',
                        position: 'fixed',
                        border: 'solid 1px #DEE2E6',
                        borderRadius: '5px',
                        top: '190px',
                        left: '5%'
                        }}/>

            <div id="waveColorButton" style={{  display: 'flex', 
                                                position: 'fixed',
                                                top: '85px',
                                                left: '5%'}}>
                <ButtonGroup>
                    <Button variant='dark' style={{background: 'red'}} onClick={colorRed}>Red</Button>
                    <Button variant='dark' style={{background: 'blue'}} onClick={colorBlue}>Blue</Button>
                    <Button variant='dark' style={{background: 'green'}} onClick={colorGreen}>Green</Button>
                    <Button variant='dark' style={{background: 'grey'}} onClick={colorInstrument}>Instrument</Button>
                </ButtonGroup>
            </div>
            <div style={{display: 'flex', position: 'fixed', top: '130px', left: '5%'}}>
                <p>Instrument Colors:<br></br>Guitar = Orange | Piano = Purple | Trumpet = Yellow | Violin = Cyan</p>
            </div>
        </>
    )
}