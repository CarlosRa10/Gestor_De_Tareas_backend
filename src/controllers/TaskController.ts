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
            return
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
            return
        }
     
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        
        try {
            const tasks = await Task.find({project:req.project.id}).populate('project')//tienes que ver las referencias en tus modelos, para cuando hagas cruce con un populate sepa a donde tiene que ir a traerse esa información
            res.json(tasks)
            return
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
            return
        }
     
    }

    static getTaskById = async (req: Request, res: Response) => {
        
        try {
            const task = await Task.findById(req.task.id)
                            .populate({path:'completedBy.user', select:'id name email' })
                            .populate({path:'notes', populate:{path:'createdBy', select:'id name email'}})
            res.json(task)
            return
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
            return
        }
     
    }


    static updateTask = async (req: Request, res: Response) => {
        
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send("Tarea Actualizada Correctamente")
            return
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
            return
        }
     
    }


    static deleteTask = async (req: Request, res: Response) => {
        
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            // await task.deleteOne()
            // await req.project.save()
            await Promise.allSettled([req.task.deleteOne(),req.project.save()])
            res.send("Tarea Eliminada Correctamente")
            return
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
            return
        }
     
    }


    static updateStatus = async (req: Request, res: Response) => {
        
        try {
            //Revisamos el estado
            const {status} = req.body
            req.task.status = status

            const data = {
                user: req.user.id,
                status
            }
            req.task.completedBy.push(data)
            await req.task.save()
            res.send('Tarea Actualizada')
            return
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
            return
        }
     
    }
}