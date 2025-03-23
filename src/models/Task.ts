//Creando modelos para las Tareas-Task
import mongoose, {Schema, Document, Types} from "mongoose";
import Note from "./Notes";
//objeto o diccionario
const taskStatus = {
    PENDING:'pending',
    ON_HOLD:'onHold',
    IN_PROGRESS:'inProgress',
    UNDER_REVIEW:'underReview',
    COMPLETED:'completed'
} as const//readonly -solo lectura-Noo se puede modificar

export type taskStatus = typeof taskStatus[keyof typeof taskStatus]

//interface
export interface ITask extends Document  {
    name: string
    description: string
    project:Types.ObjectId
    status: taskStatus
    completedBy: {
        user:Types.ObjectId,
        status:taskStatus
    }[]
    notes: Types.ObjectId[]
}

export const TaskSchema : Schema = new Schema({
    name:{
        type: String,
        trim: true,
        require:true
    },
    description:{
        type: String,
        trim: true,
        require:true
    },
    project:{
        type: Types.ObjectId,
        ref: 'Project'//Pasarle la referencia de donde va a econtrar el resto de la informacion de esa tarea-- le decimos que nos creé el documento con el nombre de Project, tiene que ser un objectid y su referencia va a ser el modelo de proyecto el cual colocamos
    },
    status:{
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING//cuando creamos la tarea, le creamos un estado de pendiente. porque recien creada es mentira que alguien hizo la tarea
    },
    completedBy:[
        {
            user:{
                type: Types.ObjectId,
                ref:'User',
                default: null
            },
            status:{
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING
            }
        }
    ],
    notes:[
        {
            type: Types.ObjectId,
            ref:'Note'
        }
    ]

},{timestamps:true})//timestamps-registra cuando fue la ultima actualización

//Middleware - funciones que se jecutan despues o antes que ocurra cierta acción
TaskSchema.pre('deleteOne',{document:true},async function () {
    const taskId = this._id
    if(!taskId) return
    await Note.deleteMany({task:taskId})
    //console.log(this._id)
})


//conexion de schema con el interface('Nombre del modelo que le quieras poner', TaskSchema)
const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task