import type {Request, Response} from 'express'

export class TaskController{
    static createProjects = async (req: Request, res: Response) => {
        //const projectId = req.params --- resultado de console.log { projectId: '670b3ba6a1600dbfe49e67ce' }-- si lo desestructuramos solo obtenemos el valor
        const {projectId} = req.params
        console.log(projectId)
        try {
            
        } catch (error) {
            console.log(error)
        }
     
    }
}