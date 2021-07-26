import Auth from '../models/auth';

const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILED = 'auth/LOGIN_FAILED';
const LOGIN_LOGOUT = 'auth/LOGIN_LOGOUT';

type Action = {
  type: string;
  payload: any;
};

export type Credentials = {
  username: string;
  password: string;
};

function loginSuccess(token: string) {
  return { type: LOGIN_SUCCESS, payload: token };
}

function loginFailed(error: string) {
  return { type: LOGIN_FAILED, payload: error };
}

function loginLoading() {
  return { type: LOGIN_LOADING };
}

export function logout() {
  return { type: LOGIN_LOGOUT };
}

export function authenticate(credentials: Credentials) {
  return async (dispatch: (arg: any) => any) => {
    dispatch(loginLoading());
    try {
      const response = await fetch('http://localhost:9001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.status === 200) {
        const { token } = await response.json();
        dispatch(loginSuccess(token));
      } else {
        const error = await response.text();
        dispatch(loginFailed(error));
      }
    } catch (err) {
      dispatch(loginFailed(err.message));
    }
  };
}

export default function reducer(state = new Auth(), action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return new Auth({
        ...state.props,
        token: action.payload,
        error: '',
        loading: false,
      });
    case LOGIN_FAILED:
      return new Auth({
        ...state.props,
        token: '',
        error: action.payload,
        loading: false,
      });
    case LOGIN_LOADING:
      return new Auth({ ...state.props, loading: false });
    case LOGIN_LOGOUT:
      return new Auth({
        ...state.props,
        token: '',
        error: '',
        loading: false,
      });
    default:
      return state;
  }
}
