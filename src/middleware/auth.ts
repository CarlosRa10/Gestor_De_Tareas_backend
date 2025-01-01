import {Request,Response,NextFunction} from 'express'

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
    //console.log(token)
    next()
}

//Es una peticion htpp - primero va la URL, luego el header y despues el body