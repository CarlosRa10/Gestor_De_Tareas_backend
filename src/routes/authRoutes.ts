import {Router} from 'express'
import {body} from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
const router = Router()
router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value,{req})=>{//el valor (lo que se ingresa) y el req son las solicitudes ingresadas que luego se pueden comparar
        //req.body.password
        //console.log(value)
        //console.log(req.body.password)
        if(value!==req.body.password){
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
        handleInputErrors,//midleware
    AuthController.createAccount
)
export default router
