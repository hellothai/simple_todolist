import express from "express";
const app = express();
const port = 3000;

app.get( "/", ( _req, res ): void => {
    res.send( "Hello world!" );
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
