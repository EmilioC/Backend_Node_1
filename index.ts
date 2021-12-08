import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();
const uri = 'mongodb://localhost:27017/fotosgram';

//Cuando se ejecute este archivo pasará por el "middleware" de usuario
//Body parser
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());

//La petición a server hará referencia a /user
server.app.use('/user', userRoutes);

const options =
{
    useNewUrlParser: true,
    useCreateIndex:true
};

// Conectar DB
mongoose.connect(uri)
.then((res) => {
    console.log(
        'Connected to Distribution API Database - Initial Connection'
    );
})
.catch((err) => {
    console.log(
        `Initial Distribution API Database connection error occured -`,
        err
    );
});

//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en ${ server.port }`);
});