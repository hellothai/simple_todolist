import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [register ,setRegister] = useState(false);
  return (
    <div className="App">      
        <p>
          OI :D
        </p>
       <Login></Login>
      <div>  <button onClick={() => setRegister(!register)}> Sign Up </button>
        {register && 
      <Register></Register>}</div>     
    </div>
  );
}

export default App;
