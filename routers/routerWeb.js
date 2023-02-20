import compression from 'compression'
import loggerMiddleware from '../pino.js'

import { Router } from 'express';
import { controladorWeb } from "../controllers/controladorWeb.js";
import { controladorWebListadoProductos } from "../controllers/controladorWeb.js";
import { controladorPostWebProductos } from "../controllers/controladorWeb.js";
import { controladorProcessInfo } from "../controllers/controladorProcessInfo.js"
import { controladorWebInfoProcess } from "../controllers/controladorProcessInfo.js"

const routerWeb = Router();

routerWeb.get('/formulario', loggerMiddleware, controladorWeb);
routerWeb.get('/productos', loggerMiddleware, controladorWebListadoProductos);
routerWeb.post('/productos', loggerMiddleware, controladorPostWebProductos);
routerWeb.get('/info', loggerMiddleware, controladorProcessInfo)
routerWeb.get('/infoConCompresion', loggerMiddleware, compression(), controladorProcessInfo)
routerWeb.get('/infoList', loggerMiddleware, controladorWebInfoProcess)

 
export default  routerWeb;

