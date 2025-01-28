import mongoose, {Schema, Document, Types} from 'mongoose'

//INote define la estructura - Typescript
export interface INote extends Document {
    content: string
    createdBy: Types.ObjectId //referencia hacia el usuario que creo esa nota
    task: Types.ObjectId
}

//Un esquema define la estructura de los documentos que se almacenarán en una colección de MongoDB.
//NoteSchema implementa la estructura
//mejor conocido como definición de modelo
const NoteSchema: Schema = new Schema({
    content: {
        type: String,
        required:true
    },
    createdBy:{
        type: Types.ObjectId,
        ref:'User',
        required:true
    },
    task:{
        type: Types.ObjectId,
        ref:'Task',
        required:true
    }
},{timestamps:true})//timestamps, para que se cree cuando fue creado y cuando fue modificado

const Note =mongoose.model<INote>('Note',NoteSchema)

export default Note