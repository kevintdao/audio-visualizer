import React from 'react';
import {Container, Row, Col, Tab, Tabs} from "react-bootstrap";
import {SignOut} from "../firebase.js";
import {Record} from "./Record.js";

export function Hub() {
    return (
        <>
          <Container>
            <Row>
              <Col xs={8}>
                <Tabs defaultActiveKey="record" id="hub">
                  <Tab eventKey="record" title="Record">
                    <h2>"Recording"</h2>
                    <Record />
                  </Tab>
                  <Tab eventKey="Visualizer" title="Visualizer">
                    <h2>"Visualizing</h2>
                  </Tab>
                  <Tab eventKey="Classifier" title="Classifier"></Tab>
                </Tabs>
              </Col>
      
              <Col xs={4}>
                <div style={{float: 'right'}}>
                  <SignOut />
                </div>
              </Col>
            </Row>
            
          </Container>
        </>
    );
}
