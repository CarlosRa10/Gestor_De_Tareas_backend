//server.ts es el punto de entrada principal. Al llamarlo allí, te aseguras de que todas las variables de entorno estén disponibles para cualquier archivo que las necesite.
//config del servidor
import express from 'express';//Librería para crear el servidor y manejar las solicitudes HTTP.
import dotenv from 'dotenv'//Permite cargar variables de entorno desde un archivo .env a process.env.
import { connectDB } from './config/db';// Importa la función de conexión a la base de datos desde db.ts.

dotenv.config()

connectDB()//db.ts a server.ts:-La función connectDB se importa en server.ts y se utiliza para conectar a MongoDB cuando se inicia el servidor.

const app = express()//La instancia de app de Express se exporta desde server.ts y se importa en index.ts, donde se inicia el servidor y se define el puerto de escucha.

export default app