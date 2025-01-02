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
    //console.log(req.headers.authorization)
    const bearer = req.headers.authorization
    if(!bearer){
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
            }else{
                res.status(500).json({error:'Token No Válido'})
            }
        }
    } catch (error) {
        res.status(500).json({error:'Token No Válido'})
    }
    //console.log(token)
    next()
}

//Es una peticion htpp - primero va la URL, luego el header y despues el body