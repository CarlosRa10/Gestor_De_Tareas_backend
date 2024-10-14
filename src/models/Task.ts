//Creando modelos para las Tareas-Task
import mongoose, {Schema, Document, Types} from "mongoose";

//interface
export interface ITask extends Document  {
    name: string
    description: string
    project:Types.ObjectId
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
    }

},{timestamps:true})//timestamps-registra cuando fue la ultima actualización
//conexion de schema con el interface('Nombre del modelo que le quieras poner', TaskSchema)
const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task