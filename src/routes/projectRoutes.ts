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
import { ProjectController } from "../controllers/ProjectController";

const router = Router()

router.get('/',ProjectController.getAllProjects)

export default router