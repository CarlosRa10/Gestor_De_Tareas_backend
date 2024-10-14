import type {Request, Response} from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController{
    static createTask = async (req: Request, res: Response) => {
        //const projectId = req.params --- resultado de console.log { projectId: '670b3ba6a1600dbfe49e67ce' }-- si lo desestructuramos solo obtenemos el valor
        const {projectId} = req.params
        //console.log(projectId)//algo parecido '670b3ba6a1600dbfe49e67ce'
        const project = await Project.findById(projectId) //importamos el modelo de Project-- tenemos que revisar si ese proyecto existe o no
        //console.log(project)
        if(!project){
            const error= new Error('Proyecto no encontrado')//si quieres no se pone este codigo y solo el de abajo con esto ---res.status(404).json({ error: 'Proyecto no encontrado' });
            res.status(400).json({error: error.message})
            return//// Solo si quieres salir después de enviar la respuesta
        }
        try {
            const task = new Task(req.body)//con lo que le pasamos, se crea la instancia de tarea, es decir nombre y descripcion
            //console.log(task)
            task.project = project.id//despues que validamos si el proyecto existe con el codigo que esta arriba le asignamos el rpoyecto al cual pertenece esta tarea
            project.tasks.push(task.id)
            await task.save()
            await project.save()
            res.send('Tarea creada correctamente')
        } catch (error) {
            console.log(error)
        }
     
    }
}