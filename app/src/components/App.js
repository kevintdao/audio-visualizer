import React from "react";
import {Container} from "react-bootstrap";

import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDjQu841eOqLzgyJF47A5nosb74qd5srZY",
    authDomain: "audiovis-271a3.firebaseapp.com",
    projectId: "audiovis-271a3",
    storageBucket: "audiovis-271a3.appspot.com",
    messagingSenderId: "1019309836920",
    appId: "1:1019309836920:web:8e5d20f1c3a2f78c8ffb8d"
  });
  }
  else{
    firebase.app();
  }
const auth = firebase.auth();
const firestore = firebase.firestore();

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

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Hub(){
  return (
    <>
   <div>RECORD</div>
   <div>VISUALIZE</div>
   <div>CLASSIFY</div> 
   <SignOut />
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