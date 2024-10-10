//server.ts es el punto de entrada principal. Al llamarlo allí, te aseguras de que todas las variables de entorno estén disponibles para cualquier archivo que las necesite.
//config del servidor
import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db';

dotenv.config()

connectDB()

const app = express()

export default app