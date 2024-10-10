import colors from 'colors'
import server from './server'

//definicion del puerto y si no esta disponible le asignamos el 4000
//esta variable de entorno se inyecta en automatico cuando haces el deployment
//si no existe el de deployment asignamos un puerto
const port = process.env.PORT || 4000

server.listen(port,(()=>{
    console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`))
}))