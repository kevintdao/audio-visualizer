import React from "react";

import {auth, SignIn} from "../firebase.js"
import {Hub} from "./Hub.js";
import {useAuthState} from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  window.startButton = document.getElementById("start");
  window.stopButton = document.getElementById("stop");
  
  return (
    <div className="App">
      {user ? <Hub /> : <SignIn />}
    </div>
  );
}

export default App;