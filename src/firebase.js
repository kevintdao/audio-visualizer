import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import "firebase/storage";
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
    <Button onClick={signOutAndDelete}>Sign Out</Button>
  )
}

export var storage = firebase.storage().ref();
export var database = firebase.database();

function signOutAndDelete() {
  var uid = auth.currentUser.uid;
  var listRef = storage.child('users/' + uid);
  listRef.listAll().then((listResults) => {
    listResults.prefixes.forEach((folderRef) => {});
    listResults.items.forEach((itemRef) => {
      itemRef.delete();
    });
  }).catch((error) => {
    console.log(error);
  });

  auth.signOut();
}