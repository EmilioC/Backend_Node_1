"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = new server_1.default();
const uri = 'mongodb://localhost:27017/fotosgram';
//La petición a server hará referencia a /user
server.app.use('/user', usuario_1.default);
const options = {
    useNewUrlParser: true,
    useCreateIndex: true
};
// Conectar DB
mongoose_1.default.connect(uri)
    .then((res) => {
    console.log('Connected to Distribution API Database - Initial Connection');
})
    .catch((err) => {
    console.log(`Initial Distribution API Database connection error occured -`, err);
});
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en ${server.port}`);
});
