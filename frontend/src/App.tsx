import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [register ,setRegister] = useState(false);
  return (
    <div className="App">      
        <p>
          Welcome :D
        </p>
       <Login></Login>
      <div>  <Button onClick={() => setRegister(!register)}> Sign Up </Button>
        {register && 
      <Register></Register>}</div>     
    </div>
  );
}

export default App;
