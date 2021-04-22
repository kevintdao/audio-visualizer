import React from "react";

import {auth, SignIn} from "../firebase.js"
import {Hub} from "./Hub.js";
import {useAuthState} from 'react-firebase-hooks/auth';
import {socket} from '../client.js'

function App() {
  const [user] = useAuthState(auth);

  console.log(socket);

  return (
    <div className="App">
      {user ? <Hub /> : <SignIn />}
    </div>
  );
}

export default App;