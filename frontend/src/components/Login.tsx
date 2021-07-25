import { useState } from 'react';
import Card from '@material-ui/core/Card';
import { Button, Grid, TextField } from '@material-ui/core';
import '../App.css';
// import Dashboard from './Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { Credentials, authenticate } from '../redux/auth';
import { Store } from '../redux/store';

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state: Store) => state.auth);

  const submit = (credentials: Credentials) => {
    dispatch(authenticate(credentials));
  };

  return (
    <Card elevation={2} className="login" style={{ maxHeight: 800 }}>
      {!auth.token && (
        <LoginForm submit={(credentials) => submit(credentials)} />
      )}
      {auth.loading && <Loading />}
      {auth.error && <Error message={auth.error} />}
      {auth.token && <Success token={auth.token} />}
    </Card>
  );
}

function Success(props: { token: string }) {
  return <div>Success: authenticated with token {props.token}</div>;
}

function Error(props: { message: string }) {
  return <div>Error: {props.message}</div>;
}

function Loading() {
  return <div>Loading...</div>;
}

function LoginForm(props: { submit: (credentials: Credentials) => void }) {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    
      <Grid className="" >
        <Grid sm={6} item>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.submit({
                username: name,
                password,
              });
            }}
          >
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              size="small"
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              size="small"
            />
            <br />
            <Button size="small" variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Grid> </Grid>


  );
}

export default Login;
