import React from 'react';
import {Container} from "react-bootstrap";
import {SignOut} from "../firebase.js";
//import {Record} from "./Record.js";
import { Record } from "./betterRecord";
import {Visualizer} from "./Visualizer.js";
import {visalizerInit} from '../analyzer.js';
import {setAudioOn, setAudioOff} from '../analyzer.js';
import {createModel} from "../tensorflow.js";
// import { recordInit } from '../record';

export function Hub() {
    // recordInit();
    window.isListening = false;
    createModel().then(result => {
      window.recognizer = result;
      window.classLabels = window.recognizer.wordLabels();
      window.labelContainer = document.getElementById("label-container");

      for (let i = 0; i < window.classLabels.length + 2; i++) {
        window.labelContainer.appendChild(document.createElement("div"));
        if(i < window.classLabels.length){
          window.labelContainer.childNodes[i].innerHTML = window.classLabels[i] + ": 0%";
        }
        else if(i === window.classLabels.length){
          window.labelContainer.childNodes[i].innerHTML = "Current: ";
        }
        else{
          window.labelContainer.childNodes[i].innerHTML = "Most played: ";
        }
      }
    });

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
                          right: '5%'}}>
              <Record /> 
            </div>

            <div style={{border: 'solid 1px #DEE2E6',
                        borderRadius: '5px',
                        display: 'flex',
                        position: 'fixed',
                        right: '5%',
                        top: '135px',
                        padding: '10px'}}>
              <div div id="label-container" style={{width: '225px'}}>
              </div>
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
