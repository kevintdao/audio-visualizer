import React from "react";
import {Container} from "react-bootstrap";
import {auth, SignIn} from "../firebase.js"

import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

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
   <div>RECORD</div>
   <div>VISUALIZE</div>
   <div>CLASSIFY</div> 
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