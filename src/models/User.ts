import mongoose,{Schema,Document} from "mongoose";// constructores Schema y Document de Mongoose, que se utilizan para definir la estructura de los documentos en la base de datos

//hereda Document
//estructura de un documento de usuario en MongoDB.
export interface IUser extends Document{//esta interfaz hereda de Document, lo que significa que los documentos de usuario tendrán las características estándar de los documentos de MongoDB, como el _id generado automáticamente.
    email:string
    password:string
    name:string
    confirmed:boolean
}
// esquema del documento de usuario.
const userSchema:Schema = new Schema({
    email:{
        type:String,
        require:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    confirmed:{
        type:Boolean,
        default:false
    }
})
//creacion de modelo de usuario
const User = mongoose.model<IUser>('User',userSchema)
export default User