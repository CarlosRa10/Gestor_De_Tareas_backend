import type {Request, Response} from 'express'
import Project from '../models/Project'

// un metodo estatico no requiere ser instanciado -class ProjectController tiene un getAllProjects en este caso seria un metodo

export class ProjectController {
    static createProjects = async (req: Request, res: Response) => {
        //console.log(req.body)
        //este es un metododo - const project = new Project(req.body) try { await project.save(req.body) que es igual a esto await Project.create(req.body) pero no puedes hacer tantas validaciones
        const project = new Project(req.body)
        try {
            await project.save(req.body)
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        res.send('Todos los proyectos')
    }
}