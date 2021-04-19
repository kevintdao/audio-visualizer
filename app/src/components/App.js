import React, {useState} from "react";

import {auth, SignIn} from "../firebase.js"
import {Hub} from "./Hub.js";
import {useAuthState} from 'react-firebase-hooks/auth';

// global variables
window.isPaused = true;
window.file = document.getElementById("file");
window.audio = document.getElementById("audio");
window.canvas = document.getElementById("canvas");
window.context = null;
window.audioSrc = null;
window.analyser = null;
window.ctx = null;
window.bufferLength = null;
window.dataArray = null;

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <Hub /> : <SignIn />}
    </div>
  );
}

export default App;