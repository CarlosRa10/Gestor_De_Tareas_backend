import type {Request, Response} from 'express'

// un metodo estatico no requiere ser instanciado -class ProjectController tiene un getAllProjects en este caso seria un metodo

export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {
        res.send('Todos los proyectos')
    }
}