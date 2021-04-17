import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}