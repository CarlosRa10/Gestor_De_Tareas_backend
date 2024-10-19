//Relacionado a los proyectos

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