import express from 'express'

export default class Server {

    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express ();
    }

    //Función a ejecutar cuando arranque el servidor
    start ( callback: Function){
        this.app.listen( this.port , callback() );
    }
}