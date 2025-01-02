import jwt from 'jsonwebtoken'
import  Types  from 'mongoose'
type UserPayload = {
    id: Types.ObjectId
}
//tenemos que colocar lo minimo que requiere el servidor para identificar un usuario
//Id
export const generateJWT = (payload:UserPayload) => {

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'180d'
    })
    return token
}


//JSON Web Tokens - Para los usuarios - 
// npm i jsonwebtoken- la dependencia nos permite 2 cosas - 1 generar el json web token 2 comprobar el json web token 
//npm i -D @types/jsonwebtoken - me aparezcan los metodos 
//Va a ser la forma en la que vamos a autenticar a nuestros usuarios en nuestras aplicaciones de react
//Un JSON Web Token (JWT) es un estándar abierto que define un formato compacto y seguro para transmitir información entre dos partes de manera segura como un objeto JSON.
//Consta de 3 partes 
//Header o encabezado 
//Payload
//Signature o firma
//Seguridad: JWT utiliza algoritmos de firma digital para aegurar que los datos 
// no han sido alterados durante la transmisión. Esto garantiza la integridad de la información y permite a las partes confiar en su validez
//Autenticación y Autorización: JWT se utiliza comúnmente para autenticar usuarios y permitirles acceder a recuros protegidos. Una vez que un usuario ha sido autenticado 
//correctamente, se le proporcionara un JWT que contiene información sobre sus permisos y roles. El servidor puede verificar la validez del token y autorizar o restringir el acceso.
//Trasferencia eficiente de datos: JWT es un formato compacto que se puede transmitir fácilmente a través de diferentes medios, como encabezados HTTP, URL o incluso en el cuerpo de
//solicitud HTTP. Esto lo hace adecuado para su uso en aplicaciones web y servicios de API.
//Stateless (sin estado): Los JWT son 'Sin estado', lo que significa que la información necesaria para autenticar y autorizar a un usuario se encuentra directamente en el token.
//Esto elimina la necesidad de almanecar información de sesión en el servidor lo que facilita la escalabilidad de las aplicaciones distribuidas 
//En resumen, JWT proporciona un mecanismo seguro y eficiente para transmitir información entre dos partes, autenticar usuarios y autorizar el acceso a recursos protegidos
//en aplicaciones web y servicios de API. Su naturaleza compacta, seguridad y facilidad de uso lo convierte en una opción popular para la implementación de sistemas de 
//autenticación y autorización