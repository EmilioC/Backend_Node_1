import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

//Login
 userRoutes.post('/login', ( req: Request, res: Response)=>{
     
    const body = req.body;

    Usuario.findOne({ email: body.email}, ( err: any, userDB: any ) =>{

        if ( err ) throw err;

        if( !userDB ){
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password )){

            res.json({
                ok: true, 
                token: 'TOKEN KDIDKDIDKDID'
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
            });

        }
    })
 })

//Crear usuario

userRoutes.post('/create', ( req: Request, res: Response) =>{

    const user = {
        nombre    : req.body.nombre,
        email     : req.body.email,
        password  : bcrypt.hashSync(req.body.password, 10),
        avatar    : req.body.avatar
    }



    //Al crear un usuario enviará el resumen del mismo
    Usuario.create( user ). then( userDb => {

        res.json({
            ok: true,
            //Si se crea usuario entonces user será usuario de userDbx
            user: userDb
        })
    }).catch( err => {
        let mensaje: String = "Que tal"
        res.json({
            ok: false,
            //Indica el fallo
            err,
            mensaje
            
        })
    })
})


// userRoutes.get('/prueba', ( req: Request, res: Response) =>{

//     res.json({
//         ok: true,
//         mensaje: 'Working good'
//     })
// })

// Actualizar usuario. No se llamará al menos que el usuario sea válido. Para esto
// crearemos un middleware
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email : req.body.email  || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });

});

export default userRoutes;