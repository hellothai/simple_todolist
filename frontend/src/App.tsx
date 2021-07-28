import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import store, { Store } from './redux/store';
import 'tailwindcss/tailwind.css';
import { useEffect } from 'react';
import Redirect from './components/Redirect'
import { logout } from './redux/auth'
import { ButtonGroup, Button, Grid } from '@material-ui/core';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Links />
        <Routes />
      </Router>
    </Provider>
  );
}

function Home() {
  const auth = useSelector((state: Store) => state.auth);
  return (
    <div className="pt-5 font-bold inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg">
      <div>Home</div>
      <div>
        {auth.logged ? (
          <User user={auth.user} />
        ) : (
          <Redirect message={'you must log in'} to={'/login'} />
        )}
      </div>
    </div>
  );
}

function User(props: { user: any }) {
  return <div>User: {props.user}</div>;
}

function Links() {
  const auth = useSelector((state: Store) => state.auth);
  return (
    <Grid className="pt-5 font-bold bg-gradient-to-r from-cyan-400 to-sky-500" container justify="space-between">
      <Link to="/">Home </Link>
      {!auth.logged ? (
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button>  <Link to="/login">Login</Link></Button>
          <Button>     <Link to="/register">Register</Link></Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button> <Link to="/dashboard">Dashboard</Link></Button>
          <Button> <Link to="/logout">Logout</Link></Button>
        </ButtonGroup>
      )}
    </Grid >
  );
}

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  });
  return (
    <Redirect message={'to home. logging out'} to={'/'} />
  )
}

function Routes() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
