//modelos: la forma que va a tener los datos en tus bases de datos
import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

//Document: Este es un tipo que proviene generalmente de Mongoose (o de la biblioteca que estés usando). Representa un documento de MongoDB, lo que significa que este tipo ya incluye todos los métodos y propiedades que tiene un documento en la base de datos.
//&: Este símbolo se usa para la intersección de tipos. Significa que ProjectType no solo es un Document, sino que también puede incluir propiedades adicionales que se definan en el objeto vacío {}.
//type de typescript
// export type ProjectType = Document & {
//     projectName: string
//     clientName: string
//     description: string
// }

//interface
export interface IProject extends Document  {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[]//ITask-hace referencia a decirle que vamos a almacenar en esos subdocumentos y tambien tener la extencion o herencia de Document
    manager: PopulatedDoc<IUser & Document>
}


//definir el Schema - modelo para mongoose - son dos cosas el type y el mongoose
//el required hace que sea obligatorio esa validacion - spred validator tambien sirve para validar pero aqui tambien podemos
const ProjectSchema: Schema = new Schema({
    projectName:{
        type: String,
        require: true,
        trim: true
    },
    clientName:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    tasks:[//Un proyecto va a tener multiples tareas
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})


//Para conectarse-- definimos nuestro modelo y se registra en la instancia de mongoose
// con el metodo model estamos agregando un modelo a la instancia de momgoose
const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project