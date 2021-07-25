const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILED = 'auth/LOGIN_FAILED';

type Action = {
  type: string,
  payload: any
}

export type Credentials = {
  username: string;
  password: string;
};

export type Auth = {
  token: string,
  error: string,
  loading: boolean,
}

const authState = {
  token: null,
  error: null,
  loading: false,
};


export function loginSuccess(token: string) {
  return { type: LOGIN_SUCCESS, payload: token };
}

export function loginFailed(error: string) {
  return { type: LOGIN_FAILED, payload: error };
}

export function loginLoading() {
  return { type: LOGIN_LOADING };
}

export function authenticate(credentials: Credentials) {
  // todo: 
  //  1. add token to cookies
  //  2. verify that tokens are not in cookies on startup
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
          dispatch(loginSuccess(token))
      } else {
        const error = await response.text();
        dispatch(loginFailed(error))
      }
    } catch (err) {
      dispatch(loginFailed(err.message));
    }
  }
}

export default function reducer(state = authState, action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, error: null, loading: false };
    case LOGIN_FAILED:
      return { ...state, token: null, error: action.payload, loading: false };
    case LOGIN_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
