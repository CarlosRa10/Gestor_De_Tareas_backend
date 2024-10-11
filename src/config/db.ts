import mongoose from 'mongoose'// Librería para conectarse y trabajar con MongoDB.
import colors from 'colors'//Librería para dar color a las salidas en la consola, mejorando la legibilidad.
import { exit } from 'node:process';//exit: Función de node:process que permite salir del proceso en caso de error.

export const connectDB = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        //console.log(connection)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.cyan.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        //console.log(error.message)
        console.log(colors.red.bold('Error al conectar al MongoDB'))
        exit(1)
    }
}