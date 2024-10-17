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
            res.status(500).json({ error: 'Server Error' });
        }
     
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        
        try {
            const tasks = await Task.find({project:req.project.id}).populate('project')//tienes que ver las referencias en tus modelos, para cuando hagas cruce con un populate sepa a donde tiene que ir a traerse esa información
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
     
    }

    static getTaskById = async (req: Request, res: Response) => {
        
        try {
            const {taskId} = req.params
            const task = await Task.findById(taskId)
            if(!task){
                const error = new Error('Tarea no encontrada')
                res.status(404).json({error:error.message})//cuando algo no se encuentra es un 404  
                return
            }
            //Siempre que trabajemos con los ID de mongoDB asegurarnos de convertirlo a string, porque el new object ID siempre dara un valor diferente, es como si fuera un objeto  
            //console.log(task.project.toString())
            //console.log(req.project.id)
            //task.project: Este valor, al ser obtenido de una base de datos (presumiblemente MongoDB), a menudo es un objeto de tipo ObjectId. Un ObjectId es un tipo de dato especial en MongoDB que representa un identificador único para un documento.
            if(task.project.toString() !== req.project.id){
                const error = new Error('Accion no válida')
                res.status(400).json({error:error.message})//400 Peticion mala
                return
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
     
    }


    static updateTask = async (req: Request, res: Response) => {
        
        try {
            const {taskId} = req.params
            const task = await Task.findByIdAndUpdate(taskId,req.body)
            if(!task){
                const error = new Error('Tarea no encontrada')
                res.status(404).json({error:error.message})//cuando algo no se encuentra es un 404  
                return
            }
            //Siempre que trabajemos con los ID de mongoDB asegurarnos de convertirlo a string, porque el new object ID siempre dara un valor diferente, es como si fuera un objeto  
            //console.log(task.project.toString())
            //console.log(req.project.id)
            //task.project: Este valor, al ser obtenido de una base de datos (presumiblemente MongoDB), a menudo es un objeto de tipo ObjectId. Un ObjectId es un tipo de dato especial en MongoDB que representa un identificador único para un documento.
            if(task.project.toString() !== req.project.id){
                const error = new Error('Accion no válida')
                res.status(400).json({error:error.message})//400 Peticion mala
                return
            }
            res.send("Tarea Actualizada Correctamente")
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
     
    }
}