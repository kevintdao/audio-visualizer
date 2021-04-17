import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAnw_mndqxXa04-KxV8F_8SvOsK9Whqsx4",
    authDomain: "audio-visualizer-e21e3.firebaseapp.com",
    projectId: "audio-visualizer-e21e3",
    storageBucket: "audio-visualizer-e21e3.appspot.com",
    messagingSenderId: "493208962038",
    appId: "1:493208962038:web:d892aec8668acb4157bdd7"
  });

  export const auth = app.auth();
  export default app;