import React from "react";
import {Container, Row, Col, Tab, Tabs} from "react-bootstrap";
import {auth, SignIn, SignOut} from "../firebase.js"
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
      </header>
      <section>
        {user ? <Hub /> : <SignIn />}
      </section>
    </div>
  );
}

function Hub(){
  return (
  <>
    <Container>
      <Row>
        <Col xs={8}>
          <Tabs defaultActiveKey="record" id="hub">
            <Tab eventKey="record" title="Record">
              <h2>"Recording"</h2>
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
// This will be where all features will live, will eventually allow the user to be able to tab between each one.
// function Hub() {
//   return (
//     <ButtonRecordTab />
//     <VisualizerTab />
//     <ClassiferTab / >
//   )
// }

export default App;