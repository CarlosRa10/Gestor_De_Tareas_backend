import type {Request,Response} from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import Token from '../models/Token'
import { AuthEmail } from '../emails/AuthEmail'


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
            //Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            //Enviar Email
            AuthEmail.sendConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

            //await user.save()
            await Promise.allSettled([user.save(),token.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla') 
        } catch (error) {//se hay error se envia una respuesta
            res.status(500).json({error:'Hubo un error'})
        }
    }

    static confirmAccount = async(req:Request,res:Response)=>{
        try {
           const {token} = req.body
           console.log(token)
           const tokenExists = await Token.findOne({token})
           console.log(tokenExists)
           if(!tokenExists){
            const error = new Error('Token no válido')
            res.status(404).json({error:error.message})
            return
           }
           const user = await User.findById(tokenExists.user)
           console.log(user)
           user.confirmed = true
           await Promise.allSettled([ user.save(),tokenExists.deleteOne() ])
           res.send('Cuenta confirmada correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }
//Algoritmo para iniciar sesión
// La primera comprobación que se debe realizar es saber si el usuario existe o no.
// La segunda comprobación es revisar si su cuenta ya ha sido confirmada.
// La última comprobación es revisar si el password es correcto, en caso de que si lo sea el usuario es autenticado.
    static login = async(req:Request,res:Response)=>{
        try {
            //res.send('Autenticando...')
            const {email,password}=req.body
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('Usuario no encontrado')
                res.status(404).json({error:error.message})         
            }
            if(!user.confirmed){
                const token = new Token()
                token.user=user.id
                token.token= generateToken()
                await token.save()
            //Enviar Email
            AuthEmail.sendConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación')
                res.status(401).json({error:error.message})         
            }
            console.log(user)

            //Revisar Password
            const isPasswordCorrect = await checkPassword(password,user.password)
            console.log(isPasswordCorrect)
            if(!isPasswordCorrect){
                const error = new Error('Password Incorrecto')
                res.status(401).json({error:error.message})        
            }
            res.send('Autenticado...')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }

    static requestConfirmationCode = async(req:Request,res:Response)=>{
        try {
            const {email} = req.body
            //Usuario existente
            const user = await User.findOne({email})//buscar un usuario por el campo de email
            if(!user){
                const error = new Error('El usuario no esta registrado')
                res.status(404).json({error:error.message})
                return
            }

            if(user.confirmed){
                const error = new Error('El usuario ya esta confirmado')
                res.status(403).json({error:error.message})
            }
        
            //Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            //Enviar Email
            AuthEmail.sendConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

            //await user.save()
            await Promise.allSettled([user.save(),token.save()])
            res.send('Se envió un nuevo token a tu email') 
        } catch (error) {//se hay error se envia una respuesta
            res.status(500).json({error:'Hubo un error'})
        }
    }
}
