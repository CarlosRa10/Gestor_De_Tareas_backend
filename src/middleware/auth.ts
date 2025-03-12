import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req:Request, res:Response, next:NextFunction) => {
    console.log(req.headers.authorization)
    const bearer = req.headers.authorization
    if(!bearer){
        console.log(bearer)
        const error = new Error('No Autorizado')
        res.status(401).json({error: error.message})
        return
    }
    //const token = bearer.split(' ')[1]
    const [, token] = bearer.split(' ')
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded)
        if(typeof decoded === 'object' && decoded.id){
            const user = await User.findById(decoded.id).select('_id name email')
            //console.log(user)
            if(user){
                req.user = user
                next()
            }else{
                res.status(500).json({error:'Token No Válido'})
            }
        }
    } catch (error) {
        res.status(500).json({error:'Token No Válido'})
    }
    //console.log(token)
}

//Es una peticion htpp - primero va la URL, luego el header y despues el body

//Autenticación y Autorización 
//La autenticación y la autorización son dos procesos fundamentales en la seguridad de sistemas y aplicaciones, que a menudo se confunden, pero tienen propósitos distintos.
//Autenticación 
//Es el proceso de verificar la identidad de un usuario o entidad. Se trata de asegurarse de que el usuario es realmente quien dice ser.
//Esto se hace típicamente a través de credenciales como nombres de usuario y contraseñas, tokens de seguridad, reconocimiento biométrico (como huellas dactilares o reconocimiento facila), entre otros. 
//La autenticación responde a la pregunta: "Eres realmente quien dices ser?"
//Autorización
//Una vez que la identidad del usuario ha sido verificada mediante la autenticación, la autorización es el proceso de 
//determinar si se le debe permitir acceder a recursos o realizar ciertas acciones
//Esto implica verificar sus permisos y roles en el sistema. Por ejemplo, es una empresa, un empleado puede estar autenticado (el sistema sabe quién es) pero puede o no estar
//autorizado para acceder a ciertos archivos o aplicaciones, dependiendo de su rol o permisos asignados.
//La autorizacion responde a la pregunta "Tienes permiso para hacer esto?"