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
  return (dispatch: (arg: any) => any) => {
    dispatch(loginLoading());
    fetch('http://localhost:9001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then(async response => {
      return response.json().then(token => {
        dispatch(loginSuccess(token))
      });
    })
    .catch(response => {
      return response.text().then((error: string) => {
        dispatch(loginFailed(error))
      });
    });
  }
}

export default function reducer(state = authState, action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { token: action.payload, error: null, loading: false };
    case LOGIN_FAILED:
      return { token: null, error: action.payload, loading: false };
    case LOGIN_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
