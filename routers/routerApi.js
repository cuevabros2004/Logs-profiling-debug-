import { Router } from 'express';
import loggerMiddleware from '../pino.js'

const routerApi = Router();

import {controladorGetProductos, 
        controladorPostProductos, 
        controladorproductosRandom,
        controladorGetProductosTest } 
from "../controllers/controladorProductos.js";

 

import { controladorPostChat } from "../controllers/controladorChat.js";

routerApi.post('/', loggerMiddleware, controladorPostProductos);
routerApi.get('/',  loggerMiddleware, controladorGetProductos);
routerApi.get('/productos-test', loggerMiddleware, controladorGetProductosTest);
routerApi.get('/random/productosRandom', loggerMiddleware, controladorproductosRandom);
routerApi.post('/chat',  loggerMiddleware, controladorPostChat)

export   {routerApi };
