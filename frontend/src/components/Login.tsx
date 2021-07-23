import React from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';

function Login() {
  return (
    <Card elevation={2} className="login" style={{maxHeight: 800}}>
        <p>
         name:
         <input></input>
        </p>
        
        <p>
         password:
         <input></input>
        </p>
       
    </Card>
  );
}

export default Login;
