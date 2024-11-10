import type {Request,Response} from 'express'
import User from '../models/User'

export class AuthController{
    static createAccount = async(req:Request,res:Response)=>{
        try {
            //res.send('desde /api/auth')
            const user = new User(req.body)
            await user.save()
            res.send('Cuenta creada, revisa tu email para confirmarla') 
        } catch (error) {//se hay error se envia una respuesta
            res.status(500).json({error:'Hubo un error'})
        }
    }
}