import jwt from 'jsonwebtoken';
import express, { Request } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
const secret = 'xlI8TySj5eX72D9imPMEPW6RavRIeIfbU6zNmu+AFUyYLrziFJzyvVVjFYnSfJXNcGVVtAyct2EmhWfTlCS7Ow==';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get( '/', ( _req, res ): void => {
  res.status(200).json({message: 'Hello world!'});
} );

// user / password
const users = new Map<string, string>();
users.set('thais', '123456');
users.set('breno', '123456');

type LoginRequest = {
  username: string,
  password: string
}

app.post('/login', ( req: Request<LoginRequest>, res ): void => {
  const request: LoginRequest = req.body;
  const {username, password} = {...request};
  if (users.has(username) && users.get(username) === password) {
    const token = jwt.sign({
      username,
      role: 'user'
    }, secret);
    res.status(200).json({token});
  } else {
    res.status(400).send(
      'Authentication failed.'
    );
  }
});

app.post('/register', ( req: Request<LoginRequest>, res ): void => {
  const { name, password, email } = req.body;
  if (name && password && email) {
    users.set(name, password);
    res.status(200).json('user ok');
  } else {
    res.status(400).send(
      'Register failed.'
    );
  }
});

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
