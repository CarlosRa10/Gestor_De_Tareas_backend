import type {Request, Response} from 'express'
import Task from '../models/Task'

//req una manera de compartir informcación de un archivo a otro o de una ruta a otra o de un Middleware hacia el controlador
export class TaskController{
    static createTask = async (req: Request, res: Response) => {
        
        try {
            const task = new Task(req.body)//con lo que le pasamos, se crea la instancia de tarea, es decir nombre y descripcion
            //console.log(task)
            task.project = req.project.id//despues que validamos si el proyecto existe con el codigo que esta arriba le asignamos el proyecto al cual pertenece esta tarea
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()]) //es un codigo que se ejecuta si todos los promises se cumple- si no te da errores 
            res.send('Tarea creada correctamente')
        } catch (error) {
            console.log(error)
        }
     
    }
}