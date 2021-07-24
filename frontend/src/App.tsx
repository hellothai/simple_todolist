import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [register ,setRegister] = useState(false);
  const [loginOK ,setLogin] = useState(false);
  return (
    <div className="App">      
        <p>
          Welcome :D
        </p>
        { !loginOK ? <> 
       <Login setLogin={() => setLogin(!loginOK)}></Login>
      <div>  <Button onClick={() => setRegister(!register)}> Sign Up </Button>
        {register && 
      <Register></Register>}</div> </> :   <Dashboard/>   }
    </div>
  );
}

export default App;
