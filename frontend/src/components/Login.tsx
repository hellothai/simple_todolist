import React from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';

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

function Login() {
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
      {success.length > 0 ? (
        <div>{success}</div>
      ) : (
        <form onSubmit={(e) => submit(e)}>
          <p>
            name:
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </p>
          <p>
            password:
            <input
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </p>
          <input type="submit" value="Submit" />
          {error.length > 0 ? <div>{error}</div> : null}
        </form>
      )}
    </Card>
  );
}

export default Login;
