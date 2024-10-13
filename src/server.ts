//server.ts es el punto de entrada principal. Al llamarlo allí, te aseguras de que todas las variables de entorno estén disponibles para cualquier archivo que las necesite.
//config del servidor
import express from 'express';//Librería para crear el servidor y manejar las solicitudes HTTP.
import dotenv from 'dotenv'//Permite cargar variables de entorno desde un archivo .env a process.env.
import { connectDB } from './config/db';// Importa la función de conexión a la base de datos desde db.ts.
import projectRoutes from './routes/projectRoutes'
import router from './routes/projectRoutes';

dotenv.config()

connectDB()//db.ts a server.ts:-La función connectDB se importa en server.ts y se utiliza para conectar a MongoDB cuando se inicia el servidor.

const app = express()//La instancia de app de Express se exporta desde server.ts y se importa en index.ts, donde se inicia el servidor y se define el puerto de escucha.

//Habilitar este tipo de formato - asi leera los valores que le enviemos en el body de tipo json
app.use(express.json())


//Routes--El .use porque va a soportar ese router todos los diferentes metodos o todos los verbos HTTP, delte, get, post etc
//cuando se llama cada ruta (izquierda)  se ejecuta (derecha)
app.use('/api/projects',projectRoutes)

export default app