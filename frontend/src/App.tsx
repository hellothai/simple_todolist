import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import store, { Store } from './redux/store';
import { Auth } from './redux/auth'

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
      <div>
      Home
      </div>
      <div>
        is authenticated: { auth ? 'YES' : 'NO' }
      </div>
    </div>
  );
}

function Links() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
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
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
