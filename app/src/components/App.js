import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

import {auth, SignIn} from "../firebase.js"
import {Hub} from "./Hub.js";
import {useAuthState} from 'react-firebase-hooks/auth';

const CONNECTION_PORT = 'raspberrypi.local:3001';     // current pi local host

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    let socket = io(CONNECTION_PORT, {transports: ['websocket']});
  })

  return (
    <div className="App">
      {user ? <Hub /> : <SignIn />}
    </div>
  );
}

export default App;