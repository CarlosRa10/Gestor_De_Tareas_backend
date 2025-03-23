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
import { projectExists } from "../middleware/project";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router()

router.use(authenticate)//Protege todos los endpoints que utilizan router


//cuando se llama o abre projectRoutes cual es el metodo mandado a llamar - puedes tener varios metodos
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

router.param('projectId',projectExists)//toma el nombre del parametro y de segundo un handle o funcion que se encarga de procesar siempre que exista el primer parametro     
//actualizar
router.put('/:projectId',//Este fragmento de código define una ruta GET en un router de Express.js.--/:id indica que la ruta espera un parámetro de URL llamado id. Este parámetro representa el identificador de un proyecto
    param('projectId').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    body('projectName')
        .trim().notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName')
        .trim().notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .trim().notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.updateProject)

//Eliminar
router.delete('/:projectId',//Este fragmento de código define una ruta GET en un router de Express.js.--/:id indica que la ruta espera un parámetro de URL llamado id. Este parámetro representa el identificador de un proyecto
    param('projectId').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    handleInputErrors,
    ProjectController.deleteProject)



// Routes o Rutas para las tareas o Tasks


//ejemplo de como queda /api/projects/135561315/tasks - es información que esta relacionada
//:projectId: Es un parámetro de ruta dinámico. Esto significa que cualquier valor que se coloque en este lugar de la URL será capturado y asignado a la variable projectId dentro de la función del controlador. 
//Por ejemplo, si la solicitud se hace a la URL /projects/670b3ba6a1600dbfe49e67ce/tasks, el valor 670b3ba6a1600dbfe49e67ce será asignado a projectId.
//tasks: Indica que se está trabajando con el recurso "tareas" dentro del contexto de un proyecto específico.



router.post('/:projectId/tasks',//peticion hacia esta url--- La clave está en la estructura de la ruta de la solicitud. Al incluir :projectId en la ruta, se indica al framework que ese valor será extraído y colocado en el objeto req.params.
    hasAuthorization,
    body('name')
        .trim().notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('description')
        .trim().notEmpty().withMessage('La descripción de la tarea es Obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExists)// en las rutas donde hay un taskId, queremos ejecutar el segundo parametro o siguiente handle -revisa si la tarea existe
router.param('taskId', taskBelongsToProject)// revisa si pertenece a ese proyecto

router.get('/:projectId/tasks/:taskId',// estos 3 endpoint tiene como parametro el proyecto y se valida de que el proyecto exista 
    param('taskId').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    handleInputErrors,
    TaskController.getTaskById
)


router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name')
        .trim().notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('description')
        .trim().notEmpty().withMessage('La descripción de la tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)


router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no válido'),//param('id') especifica que se está validando el parámetro id de la ruta.-isMongoId() verifica que el valor de id sea un identificador válido de MongoDB.Esto es importante porque MongoDB utiliza un formato específico para sus IDs
    handleInputErrors,
    TaskController.deleteTask
)


router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'),//validacion de taskid
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

// Routes for teams
router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('E-mail no válido'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
)

router.post('/:projectId/team',
    body('id')//En la validacipon esperamos el id
        .isMongoId().withMessage('ID no válido'),
        handleInputErrors,
        TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId')//En la validacipon esperamos el id
        .isMongoId().withMessage('ID no válido'),
        handleInputErrors,
        TeamMemberController.removeMemberById
)

//Routes para las Notes

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('El contenido de la nota es obligatorio'),
    handleInputErrors,
    NoteController.createNote
)


router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID No Válido'),
    handleInputErrors,
    NoteController.deleteNote
)

//Nested Resource Routing-Enrutamiento de Recursos Anidados
//Es un patrón de diseño en la construccion de URLs para APIs, especialmente en APIs RESTful, donde las relaciones jerárquicas entre recursos son expresadas en la estructura de la URL. 
//Este patrón es muy común en las aplicaciones web y moviles que manejan datos relacionados en forma de recursos. 
//Ventajas- /project/:projectId/tasks - 
//  revisar si el proyecto existe
//  Si el usuario tiene permisos
//  Crear tareas en ese proyecto
//simplifica tener tantas validaciones
//Middleware- forma de implementarlo
//  un Middleware nos va a permitir darle un mejor orden a nuestras rutas para aplicar este patrón de diseño para las URL's
//  Debido a que los Middleware se ejecutan en las peticiones HTTP y antes del controlador, los hacen un gran lugar para poder ejecutar ciertas acciones referentes a si los 
//  proyectos existen o si el usuario tiene permisos para acceder a él.
export default router