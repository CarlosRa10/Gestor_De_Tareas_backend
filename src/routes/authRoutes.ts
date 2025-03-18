import {Router} from 'express'
import {body, param} from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
import { authenticate } from '../middleware/auth'
const router = Router()

//Endpoints del proyecto

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

router.post('/confirm-account',
    body('token')//enviar token -validacion
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
        body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.forgotPassword
)
router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Token no válido'),
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
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

router.get('/user',
    authenticate,
    AuthController.user
)

//Profile
router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
        handleInputErrors,
    AuthController.updateProfile
)

router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El ppassword actual no puede ir vacio'),
    body('password')
    .isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value,{req})=>{//el valor (lo que se ingresa) y el req son las solicitudes ingresadas que luego se pueden comparar
    if(value!==req.body.password){
        throw new Error('Los Password no son iguales')
    }
    return true
}),
handleInputErrors,
AuthController.updateCurrentUserPassword 
)

router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('El ppassword no puede ir vacio'),
    handleInputErrors,
    AuthController.checkPassword
)
export default router
