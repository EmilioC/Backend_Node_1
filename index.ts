import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';

const server = new Server();
const uri = 'mongodb://localhost:27017/fotosgram';


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