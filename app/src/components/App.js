import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import {auth, SignIn} from "../firebase.js"
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
    <Tabs defaultActiveKey="record" id="hub">
      <Tab eventKey="record" title="Record"></Tab>
      <Tab eventKey="Visualizer" title="Visualizer"></Tab>
      <Tab eventKey="Classifier" title="Classifier"></Tab>
    </Tabs>
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