import type {Request, Response} from 'express'
import Project from '../models/Project'
//import { error } from 'node:console'
//hola
// un metodo estatico no requiere ser instanciado -class ProjectController tiene un getAllProjects en este caso seria un metodo

export class ProjectController {
    static createProjects = async (req: Request, res: Response) => {
        //console.log(req.body)
        //este es un metododo - const project = new Project(req.body) try { await project.save(req.body) que es igual a esto await Project.create(req.body) pero no puedes hacer tantas validaciones
        const project = new Project(req.body)

        // if(true){
        //     //cuando los llamados son correctos, la respuesta estan en data, pero cuando hay errores estan en response(axios), luego data(axios) y despues error que seria json({error: error.message})
        //     //cuando yo genero error o un mensaje con new Error ese mensaje siempre va a estar en ese .message
        //     const error= new Error('Proyecto no encontrado')
        //     res.status(404).json({error: error.message})
        //     return
        // }
        //Asigna un manager
        project.manager = req.user.id
        //console.log(req.user)
        try {
            await project.save(req.body)
            res.send('Proyecto Creado Correctamente')
            return
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    {manager:{$in: req.user.id}},
                    {team:{$in: req.user.id}}
                ]
            })
            res.json(projects)//como es una colección con multiples elementos lo retornamos como json
        } catch (error) {
            console.log(error)
        }
        //res.send('Todos los proyectos')
    }
    
    static getProjectById = async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params
        try {
            const project = await  Project.findById(id).populate('tasks')//cruzar información
 
            if(!project){
                const error= new Error('Proyecto no encontrado')//si quieres no se pone este codigo y solo el de abajo con esto ---res.status(404).json({ error: 'Proyecto no encontrado' });
                res.status(404).json({error: error.message})
                return//// Solo si quieres salir después de enviar la respuesta
            }
            if(project.manager.toString() !== req.user.id.toString() &&!project.team.includes(req.user.id) ){
                const error= new Error('Acción no Válida')
                res.status(404).json({error: error.message})
                return
            }
            res.json(project)// Enviar la respuesta pero no devolverla
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
            return
        }
    }


    static updateProject = async (req: Request, res: Response): Promise<void> => {
        try {
            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description
            await req.project.save()
            res.send('Proyecto Actualizado')
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
            return
        }
    }


    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        try {
            await req.project.deleteOne()
            res.send('Proyecto Eliminado')
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
            return
        }
    }
}

