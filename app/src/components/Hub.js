import React from 'react';
import {Container, Row, Col, Tab, Tabs} from "react-bootstrap";
import {SignOut} from "../firebase.js";
import {Record} from "./Record.js";
import {Visualizer} from "./Visualizer.js";
import {visalizerInit} from '../analyzer.js';
import {setAudioOn, setAudioOff} from '../analyzer.js';
import { recordInit } from '../record';

export function Hub() {
    recordInit();

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
                    style={{marginTop: '10px'}} capture/>
              </Col>


            </Row>
          </Container>
        </>
    );
}
