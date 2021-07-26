import jwt from 'jsonwebtoken';

export class User {
  public readonly username: string;
  constructor(username: string) {
    this.username = username;
  }
}

type AuthProps = {
  token: Token;
  error: AuthError;
  loading: boolean;
};

export default class Auth {
  public readonly props: AuthProps;
  constructor(
    props: AuthProps = {
      token: '',
      error: '',
      loading: false,
    }
  ) {
    this.props = props;
  }
  get user() {
    return jwt.decode(this.props.token);
    // const decoded = jwt.decode(this.props.token);
    // if (decoded && decoded.username) {
    //   return new User(decoded.username);
    // }
    // return null;
  }
  get loading() {
    return this.props.loading;
  }
  get logged() {
    console.log('>>> logged: ', !!this.props.token);
    return !!this.props.token;
  }
  get error() {
    return this.props.error ? this.props.error : false;
  }
}

export type Token = string;
export type AuthError = string;
