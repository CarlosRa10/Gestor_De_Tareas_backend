//npm i cors
//npm i -D @types/cors

import {CorsOptions} from 'cors'

export const corsConfig: CorsOptions = {
    origin: function(origin, callback){// origin es de donde se presenta la petición, en este caso desde la URL de react y callback, va a ser lo que va a permitir la conexión
        const whitelist = [process.env.FRONTEND_URL]//sintaxis de arrglo para utilizar un metodo de arrgle en el if
        if(whitelist.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}