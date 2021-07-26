import { Button, Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import '../App.css';

type RegisterForm = {
  name: string;
  password: string;
  email: string;
};

async function register(data: RegisterForm) {
  console.log('data: ', data);
  const response = await fetch('http://localhost:9001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    
      const { token } = await response.json();
      return token;
  
  } else {
    const error = await response.text();
    throw new Error(`failed: ${error}`);
  }
}


function Register() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');


  const submit = (e) => {
    e.preventDefault();
    if (name.length < 3 || password.length < 3) {
      setError('Invalid input');
      return;
    } else {
      setError('');
    }
    register({
      name,
      password,
      email
    })
      .then((token) => {
        setSuccess(`Register in successfully as ${name}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };


  return (
    <Card elevation={2} className="register" style={{ maxHeight: 800 }}>
      {success.length > 0 ? (
        <div>{success}</div>
      ) : (
        <form onSubmit={(e) => submit(e)}>
           <TextField required
          id="filled-name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="filled"
          size="small"
        />  
           <TextField required
          id="filled-name"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          size="small"
        />     
        
        <TextField
        id="filled-name"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="filled"
        size="small"
      />  
      <br/>
          <Button size="small" type="submit" value="Submit">Submit </Button>
          {error.length > 0 ? <div>{error}</div> : null}
        </form>
      )}
    </Card>
  );
  
}

export default Register;
