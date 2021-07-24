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
  name: string,
  password: string
}

app.post('/login', ( req: Request<LoginRequest>, res ): void => {
  console.log('>>> here');
  console.log('>> ', req.body);
  const { name, password } = req.body;
  console.log(users.get(name));
  if (users.has(name) && users.get(name) === password) {
    const token = jwt.sign({
      name: name,
      role: 'user'
    }, secret);
    res.status(200).json({token});
  } else {
    res.status(400).send(
      'Authentication failed.'
    );
  }
});

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
