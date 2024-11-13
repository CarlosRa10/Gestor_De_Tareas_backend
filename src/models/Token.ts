import mongoose,{Schema,Document, Types} from "mongoose";// constructores Schema y Document de Mongoose, que se utilizan para definir la estructura de los documentos en la base de datos

//estructura de un documento de usuario en MongoDB.
export interface IToken extends Document{//esta interfaz hereda de Document, lo que significa que los documentos de usuario tendrán las características estándar de los documentos de MongoDB, como el _id generado automáticamente.
    token:string
    user:Types.ObjectId
    createdAt:Date
}

const TokenSchema : Schema = new Schema({
    token:{
        type:String,
        require:true
    },
    user:{
        type:Types.ObjectId,
        ref:'User'//referencia es a que modelo va a encontrar esa información
    },
    createdAt:{
        type:Date,
        default:Date.now,//una vez que se genere el token esta sera la fecha por default
        expires:'1d'
    },
})

const Token = mongoose.model<IToken>('Token',TokenSchema)
export default Token