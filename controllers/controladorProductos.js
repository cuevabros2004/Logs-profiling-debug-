import  Contenedor  from "../container/containerDb.js";
import  ContenedorFaker  from "../container/containerFaker.js";
import { clienteSql } from '../db/clienteSql.js';
import pino from 'pino'
import colors from 'colors'

const products = new Contenedor(clienteSql, 'productos')
const productsFaker = new ContenedorFaker(clienteSql, 'productos')

const logger = pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })

const pinoError = pino("./logs/error.log");


async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    
    const id = await products.save(objeto);

    if (id.message){
        logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id.message))
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id.message)
    }else
        objeto.id = id
    
   res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await products.getAll();
    if(productos.message) { 
        logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + productos.message))
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + productos.message)
     } else 
     res.json(productos);
}

async function controladorGetProductosTest(req, res) {
    const productos = await productsFaker.getProductosTest();
    res.json(productos);
}


function controladorproductosRandom(req, res){
    res.send(products.getById(randomUUID()))
}




export {controladorGetProductos, 
        controladorPostProductos, 
        controladorproductosRandom,
        controladorGetProductosTest };