import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import {Button} from "react-bootstrap";
// import { recording } from "./components/Record";
require( 'firebase/database' );
const app = firebase.initializeApp({
      apiKey: "AIzaSyDjQu841eOqLzgyJF47A5nosb74qd5srZY",
      authDomain: "audiovis-271a3.firebaseapp.com",
      projectId: "audiovis-271a3",
      storageBucket: "audiovis-271a3.appspot.com",
      messagingSenderId: "1019309836920",
      appId: "1:1019309836920:web:8e5d20f1c3a2f78c8ffb8d"
});

export const auth = app.auth();

export default app;

// This whole block was to listen to recording value and to do something when the value changes. Does not work
// let listenRecordingValObj = {
//   isRecording: recording,
//   recordingListener: function(val) {},
//   set isRecording(val) {
//     this.isRecording = val;
//     this.recordingListener(val);
//   },
//   get isRecording() {
//     return this.isRecording;
//   },
//   registerListener: function(listener) {
//     this.recordingListener = listener;
//   }
// };
// listenRecordingValObj.registerListener(function(val) {
//   console.log(val);
//   alert("Someone clicked the button and changed val of recording to: " + val);
// });

export function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
  )
}

export function SignOut() {
  return auth.currentUser && (
    <Button onClick={() => auth.signOut()}>Sign Out</Button>
  )
}


export var database = firebase.database();
