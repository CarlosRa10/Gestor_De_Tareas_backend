//basicamente los middleware son funciones que se ejecutan en las funciones HTTP
import type {Request,Response,NextFunction} from 'express'
import {validationResult} from 'express-validator'//para obtener resultado de una validacion
export const handleInputErrors = (req:Request,res:Response,next:NextFunction): Promise<void> =>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
        return // Devuelve la respuesta y detiene la ejecución
    }
    next()
    return// Opcional, pero asegura que se devuelva una promesa
}