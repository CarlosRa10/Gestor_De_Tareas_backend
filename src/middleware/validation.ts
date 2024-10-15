//basicamente los middleware son funciones que se ejecutan en las funciones HTTP
import type {Request,Response,NextFunction} from 'express'
import {validationResult} from 'express-validator'//para obtener resultado de una validacion
//. Su principal función es interceptar las solicitudes HTTP, verificar si hay errores de validación y, en caso de encontrarlos, enviar una respuesta al cliente indicando los errores específicos.
//handleInputErrors: Esta función es un middleware estándar de Express, que recibe tres argumentos:
//req: El objeto de solicitud.
//res: El objeto de respuesta.
//next: La función de siguiente middleware en la cadena.


export const handleInputErrors = (req:Request,res:Response,next:NextFunction): Promise<void> =>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
        return // Devuelve la respuesta y detiene la ejecución
    }
    next()
    return// Opcional, pero asegura que se devuelva una promesa
}