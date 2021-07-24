import React from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import { Button, TextField } from '@material-ui/core';
import Dashboard from './Dashboard';

type LoginForm = {
  name: string;
  password: string;
};

async function login(data: LoginForm) {
  console.log('data: ', data);
  const response = await fetch('http://localhost:9001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    try {
      const { token } = await response.json();
      return token;
    } catch (err) {
      throw new Error(`failed: ${err.message}`);
    }
  } else {
    const error = await response.text();
    throw new Error(`failed: ${error}`);
  }
}

function Login(props) {
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [success, setSuccess] = React.useState<string>('');

  const submit = (e) => {
    e.preventDefault();
    if (name.length < 3 || password.length < 3) {
      setError('Invalid input');
      return;
    } else {
      setError('');
    }
    login({
      name,
      password,
    })
      .then((token) => {
        setSuccess(`Logged in successfully as ${name}:\nToken: ${token}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Card elevation={2} className="login" style={{ maxHeight: 800 }}>
      {success.length > 0 ? (     props.setLogin() 
      ) : (
        <form onSubmit={(e) => submit(e)}>
          <TextField
          id="filled-name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="filled"
        />  
           <TextField
          id="filled-name"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
        /> 
        <br/> 
          <Button size="small" variant="contained" type="submit">Submit</Button>
          {error.length > 0 ? <div>{error}</div> : null}
        </form>
      )}
    </Card>
  );
}

export default Login;
