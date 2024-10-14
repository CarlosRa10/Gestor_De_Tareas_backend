import mongoose, {Schema, Document} from "mongoose";

//interface
export interface ITask extends Document  {
    name: string
    description: string
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

})
//conexion de schema con el interface('Nombre del modelo que le quieras poner', TaskSchema)
const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task