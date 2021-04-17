import React from "react";

import {auth, SignIn} from "../firebase.js"
import {Hub} from "./Hub.js";
import {useAuthState} from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <Hub /> : <SignIn />}
    </div>
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