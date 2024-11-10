import type {Request,Response} from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'

export class AuthController{
    static createAccount = async(req:Request,res:Response)=>{
        try {
            const {password,email} = req.body
            //Prevenir duplicados
            const userExists = await User.findOne({email})//buscar un usuario por el campo de email
            if(userExists){
                const error = new Error('El usuario ya esta registrado')
                res.status(409).json({error:error.message})
                return
            }
            //res.send('desde /api/auth')
            //Crea un usuario
            const user = new User(req.body)

            //hash password
            user.password = await hashPassword(password)

            await user.save()
            res.send('Cuenta creada, revisa tu email para confirmarla') 
        } catch (error) {//se hay error se envia una respuesta
            res.status(500).json({error:'Hubo un error'})
        }
    }
}