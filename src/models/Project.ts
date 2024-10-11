//modelos: la forma que va a tener los datos en tus bases de datos
import mongoose, {Schema, Document} from "mongoose";

//Document: Este es un tipo que proviene generalmente de Mongoose (o de la biblioteca que estés usando). Representa un documento de MongoDB, lo que significa que este tipo ya incluye todos los métodos y propiedades que tiene un documento en la base de datos.
//&: Este símbolo se usa para la intersección de tipos. Significa que ProjectType no solo es un Document, sino que también puede incluir propiedades adicionales que se definan en el objeto vacío {}.
//type de typescript
export type ProjectType = Document & {
    projectName: string
    clientName: string
    description: string
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
})


//Para conectarse-- definimos nuestro modelo y se registra en la instancia de mongoose
// con el metodo model estamos agregando un modelo a la instancia de momgoose
const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project