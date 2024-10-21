import type {Request, Response} from 'express'
import Project from '../models/Project'
import { error } from 'node:console'

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
        try {
            const projects = await Project.find({})
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
                res.status(400).json({error: error.message})
                return//// Solo si quieres salir después de enviar la respuesta
            }
            res.json(project)// Enviar la respuesta pero no devolverla
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        }
    }


    static updateProject = async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params
        try {
            const project = await  Project.findById(id)//toma como segundo parametro req.body, es decir lo que le estmos pasando el json que se ve en thunderClient y en automatico va a suscribir el registro y lo guardamos
            if(!project){
                const error= new Error('Proyecto no encontrado')//si quieres no se pone este codigo y solo el de abajo con esto ---res.status(404).json({ error: 'Proyecto no encontrado' });
                res.status(400).json({error: error.message})
                return//// Solo si quieres salir después de enviar la respuesta
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        }
    }


    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params
        try {
            const project = await  Project.findById(id)//const project = await  Project.findByIdAndDelete(id)
            //console.log(project)
            if(!project){
                const error= new Error('Proyecto no encontrado')//si quieres no se pone este codigo y solo el de abajo con esto ---res.status(404).json({ error: 'Proyecto no encontrado' });
                res.status(400).json({error: error.message})
                return//// Solo si quieres salir después de enviar la respuesta
            }
            await project.deleteOne()
            res.send('Proyecto Eliminado')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        }
    }
}

