import { Router } from 'express';
const routerApiTest = Router();
import loggerMiddleware from '../pino.js'

import { controladorGetProductosTest } 
from "../controllers/controladorProductos.js"; 

routerApiTest.get('/', loggerMiddleware, controladorGetProductosTest);

export    {routerApiTest};
