//npm i cors
//npm i -D @types/cors

// import {CorsOptions} from 'cors'

// export const corsConfig: CorsOptions = {
//     origin: function(origin, callback){// origin es de donde se presenta la petición, en este caso desde la URL de react y callback, va a ser lo que va a permitir la conexión
//         //console.log(process.argv)//argv-son argumentos y lo guarda en un vector
//         //const whitelist = [process.env.FRONTEND_URL,process.env.BACKEND_URL]-colucion a cors -paso2 y final...paso 1 .env
//         const whitelist = [process.env.FRONTEND_URL]//sintaxis de arrglo para utilizar un metodo de arrgle en el if
//         if(process.argv[2]==='--api'){
//             whitelist.push(undefined)//thunderClient y postman no tiene un origin como el navegador
//         }
//         if(whitelist.includes(origin)){
//             callback(null,true)
//         }else{
//             callback(new Error('Error de CORS'))
//         }
//     }
// }

// import { CorsOptions } from 'cors';



// export const corsConfig: CorsOptions = {

//   origin: (origin, callback) => {

//     const whitelist = [process.env.FRONTEND_URL];



//     if (process.argv[2] === '--api') {

//       whitelist.push(undefined, null); // Permitir solicitudes sin origen (Postman, etc.)

//     }



//     if (!origin || whitelist.includes(origin)) {

//       callback(null, true); // Permitir acceso

//     } else {

//       callback(new Error('Error de CORS: origen no permitido')); // Bloquear acceso

//     }

//   },

// };


import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://gestor-de-tareas-gamma.vercel.app',
      'https://gestor-de-tareas-git-master-carlosra10s-projects.vercel.app',
      /https:\/\/gestor-de-tareas-.*\.vercel\.app/, // Regex para todos los subdominios
      'http://localhost:3000',
      'http://localhost:5173'
    ];

    // Permitir solicitudes sin origen (Postman, etc.)
    if (!origin) return callback(null, true);

    // Verificación flexible
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      }
      return allowed.test(origin); // Para regex
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error('Origen bloqueado:', origin, 'Permitidos:', allowedOrigins);
      callback(new Error('Error de CORS: origen no permitido'));
    }
  },
  credentials: true
};