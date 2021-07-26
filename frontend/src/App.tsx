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
    <div>
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
    <div className="bg-gray-100 pt-5 font-bold inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg ">
      <nav className="">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!auth.logged ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
          )}
        </ul>
      </nav>
    </div>
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
