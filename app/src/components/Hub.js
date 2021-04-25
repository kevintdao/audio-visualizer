import React from 'react';
import {Container} from "react-bootstrap";
import {SignOut} from "../firebase.js";
//import {Record} from "./Record.js";
import { Record } from "./betterRecord";
import {Visualizer} from "./Visualizer.js";
import {visalizerInit} from '../analyzer.js';
import {setAudioOn, setAudioOff} from '../analyzer.js';
// import { recordInit } from '../record';

export function Hub() {
    // recordInit();

    window.startButton = document.getElementById("start");
    window.stopButton = document.getElementById("stop");

    return (
        <>
          <Container style={{marginTop: '10px'}}>
            <div style={{ display: 'flex',
                          position: 'fixed',
                          right: '5%',
                          top: '10px'
                        }}>
              <SignOut />
            </div>
            
            <div>
              <Visualizer />
            </div>
            
            <input type="file" id="file" accept="audio/*" onChange={visalizerInit} capture
                style={{display: 'flex',
                        position: 'fixed',
                        marginBottom: '0px',
                        top: '10px',
                        left: '5%'
                       }}/>

            <a href="/" id="download" style={{display: 'flex',
                                              position: 'fixed',
                                              left: '5%',
                                              top: '45px'}}>Download</a>  
            <div style={{ display: 'flex',
                          position: 'fixed',
                          top: '85px',
                          left: '30%'}}>
              <Record /> 
            </div>

            <audio id="audio" 
              controls
              onPause={setAudioOff} 
              onPlay={setAudioOn} 
              style={{width: '90%',
                      display: 'flex',
                      position: 'fixed',
                      bottom: '20px',
                      right: '5%',
                      marginTop: '5px',
                      marginBottom: '10px'}}>
            </audio>
          </Container>
        </>
    );
}
