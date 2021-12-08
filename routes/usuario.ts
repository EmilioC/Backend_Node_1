import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';

const userRoutes = Router();

userRoutes.post('/create', ( req: Request, res: Response) =>{

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    }

    //Al crear un usuario enviará el resumen del mismo
    Usuario.create( user ). then( userDb => {

        res.json({
            ok: true,
            //Si se crea usuario entonces user será usuario de userDbx
            user: userDb
        })
    }).catch( err =>{
        console.log(err);

        res.json({
            ok: false,
            //Indica el fallo
            err
        })

    })
})


// userRoutes.get('/prueba', ( req: Request, res: Response) =>{

//     res.json({
//         ok: true,
//         mensaje: 'Working good'
//     })
// })

export default userRoutes;