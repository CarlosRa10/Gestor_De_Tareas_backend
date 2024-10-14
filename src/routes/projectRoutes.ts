// Arquitectura MVC : Model View Controller
// escribimos modelo pero requerimos arquitectura, para escribir codigo con cierto orden 
// Model View Controller: Patrón de arquitectura de software que permite la separación de obligaciones de cada pieza de tu código.
// ventajas: Orden y escalabilidad del proyecto - codigo entendible para otros programadores

// Model-Modelo: Encargado de todo lo relacionado a los datos, Base de datos y el CRUD, el Modelo esta muy relacionado a tu ORM u ODM.
// El modelo se encargará de consultar una base de datos pero no se encarga de mostrar esos datos

// View - Vista: Se encarga de todo lo que se ve en pantalla (HTML).
// El modelo se encargará de consultar la base de datos pero es la vista la que se encarga de mostrar los resultados.
// para este proyecto React es la vista- nuestro framework es M-C y la vista se hace luego

// Controlador - Controller: Es el que comunica Modelo y Vista, antes de que el modelo consulte a la base de datos el controlador es el encargado de llamarlo, una vez que el Modelo ya consultó la base de datos, es el controlador quien le comunica a la vista los datos para que se muestre

// Router: Encargado de registrar  todas las URL's o Endpoints que soporta nuestra aplicación.
// El usuario accede a la URL y el router ya tiene indicaciones de como comunicarse con un controlador especifico, ese controlador ya sabe que modelo va a llamar y que vista va a ejecutar

import { Router } from "express";
import {body,param} from 'express-validator'//body es la funcion que nos permite leer ciertos parámetros que le enviamos a Request.body
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";

const router = Router()
//cuando se llama o abre projectRoutes cual es el metodo mandado a llamar -puedes tener varios metodos
//manda a lammar el controldor y el metodo asociado a esa url
//crear
router.post('/',
    //Podemos hacer validacion en controladores pero vamos a dejarlo quieto para que solo tenga 1 accion
    body('projectName')
        .trim().notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName')
        .trim().notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .trim().notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.createProjects)


router.get('/',ProjectController.getAllProjects)

//routing dinamico '/:id-- Routing dinamico, conocido como comodin para las URL
//obtener proyecto por id
router.get('/:id',//Este fragmento de código define una ruta GET en un router de Express.js.--/:id indica que la ruta espera un parámetro de URL llamado id. Este parámetro representa el identificador de un proyecto
    param('id').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    handleInputErrors,
    ProjectController.getProjectById)
//actualizar
router.put('/:id',//Este fragmento de código define una ruta GET en un router de Express.js.--/:id indica que la ruta espera un parámetro de URL llamado id. Este parámetro representa el identificador de un proyecto
    param('id').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    body('projectName')
        .trim().notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName')
        .trim().notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .trim().notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProject)

//Eliminar
router.delete('/:id',//Este fragmento de código define una ruta GET en un router de Express.js.--/:id indica que la ruta espera un parámetro de URL llamado id. Este parámetro representa el identificador de un proyecto
    param('id').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    handleInputErrors,
    ProjectController.deleteProject)



// Routes o Rutas para las tareas o Tasks
//ejemplo de como queda /api/projects/135561315/tasks - es información que esta relacionada
router.post('/:projectId/tasks',//peticion hacia esta url
    TaskController.createProjects
)

export default router