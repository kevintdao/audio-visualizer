import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
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
  console.log("hello");
  export default app;