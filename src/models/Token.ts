import mongoose,{Schema,Document, Types} from "mongoose";// constructores Schema y Document de Mongoose, que se utilizan para definir la estructura de los documentos en la base de datos

//estructura de un documento de usuario en MongoDB.
export interface IToken extends Document{//esta interfaz hereda de Document, lo que significa que los documentos de usuario tendrán las características estándar de los documentos de MongoDB, como el _id generado automáticamente.
    token:string
    user:Types.ObjectId
    createdAt:string
}

const TokenSchema : Schema = new Schema({

})