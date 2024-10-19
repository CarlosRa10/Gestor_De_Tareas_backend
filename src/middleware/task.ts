//Relacionado a las tareas

import type {Request, Response, NextFunction} from 'express'
import Task, { ITask } from '../models/Task'
//diferencia entre type y un interface es que un type no se puede agregar cosas luego porque no puede tener dos type pero en interface puedes tener dos con el mismo nombre y sus propiedades se agregan
//esto es de typescript- y nos permite reescribir el scope global desde este módulo
declare global {
    namespace Express{//rescribir request por medio de un interface
        interface Request {
            task:ITask//hay que poner su tipo 
        }
    }
}

export async function taskExists(req:Request,res:Response,next:NextFunction) {
    try {
        //const projectId = req.params --- resultado de console.log { projectId: '670b3ba6a1600dbfe49e67ce' }-- si lo desestructuramos solo obtenemos el valor
        const {taskId} = req.params
        //console.log(projectId)//algo parecido '670b3ba6a1600dbfe49e67ce'
        const task = await Task.findById(taskId) //importamos el modelo de Project-- tenemos que revisar si ese proyecto existe o no
        //console.log(project)
        if(!task){
            const error= new Error('Tarea no encontrada')//si quieres no se pone este codigo y solo el de abajo con esto ---res.status(404).json({ error: 'Proyecto no encontrado' });
            res.status(400).json({error: error.message})
            return//// Solo si quieres salir después de enviar la respuesta
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({error:'Hubo un error'})//ver el error
    }
}

export function taskBelongsToProject(req:Request,res:Response,next:NextFunction) {
    //Siempre que trabajemos con los ID de mongoDB asegurarnos de convertirlo a string, porque el new object ID siempre dara un valor diferente, es como si fuera un objeto  
            //console.log(task.project.toString())
            //console.log(req.project.id)
            //task.project: Este valor, al ser obtenido de una base de datos (presumiblemente MongoDB), a menudo es un objeto de tipo ObjectId. Un ObjectId es un tipo de dato especial en MongoDB que representa un identificador único para un documento.
            if(req.task.project.toString() !== req.project.id.toString()){
                const error = new Error('Accion no válida')
                res.status(400).json({error:error.message})//400 Peticion mala
                return
            }
            next()//Para que se vaya al siguiente middleware 
}