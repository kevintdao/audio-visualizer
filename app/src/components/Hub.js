import React from 'react';
import {Container, Row, Col, Tab, Tabs} from "react-bootstrap";
import {SignOut} from "../firebase.js";
import {Record} from "./Record.js";
import {Visualizer} from "./Visualizer.js";
import {visalizerInit} from '../analyzer.js';
import {setAudioOn, setAudioOff, visualize} from '../analyzer.js'
import {sendUID} from '../client.js'

export function Hub() {
    //sendUID();

    return (
        <>
          <Container style={{marginTop: '10px'}}>
            <Row>
              <Col xs={8}>
                <Tabs defaultActiveKey="record" id="hub">
                  <Tab eventKey="record" title="Record">
                    <Record />
                  </Tab>
                  <Tab eventKey="Visualizer" title="Visualizer">
                    <Visualizer />
                  </Tab>
                  <Tab eventKey="Classifier" title="Classifier"></Tab>
                </Tabs>
              </Col>
      
              <Col xs={4}>
                <div style={{float: 'right'}}>
                  <SignOut />
                </div>
                <input type="file" id="file" accept="audio/*" onChange={visalizerInit}
                    style={{marginTop: '10px'}}/>
              </Col>
            </Row>
            <audio id="audio" 
                controls
                onPause={setAudioOff} 
                onPlay={setAudioOn} 
                style={{width: '95%',
                        display: 'flex',
                        position: 'fixed',
                        bottom: '20px',
                        right: '2.5%',
                        marginTop: '10px',
                        marginBottom: '10px'}}>
            </audio>
          </Container>
        </>
    );
}
