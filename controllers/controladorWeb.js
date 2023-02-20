import  Contenedor  from "../container/containerDb.js";
import { clienteSql } from '../db/clienteSql.js';
import pino from 'pino'
import colors from 'colors'

const logger = pino({
  prettyPrint: {
    colorize: true, // colorizes the log
    levelFirst: true,
    translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  },
})

const prodTest = new Contenedor(clienteSql, 'productos')

const pinoError = pino("./logs/error.log");

 function controladorWeb(req, res) {

    if(req.session?.user)
      res.render('formulario');
    else
      return res.redirect('/')
   }
 
async function controladorWebListadoProductos(req, res) {
    const productos = await prodTest.getAll();
    res.render('listado', {productos, hayProductos: productos? productos.length : null}) 
}

async function controladorPostWebProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    const resul = await prodTest.save(objeto);

    if(resul.message) { 
      logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + resul.message))
      pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + resul.message)
   } 
    res.render('formulario');
}


export {controladorWeb, 
       controladorPostWebProductos,
       controladorWebListadoProductos };

