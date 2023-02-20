import  Contenedor  from "../container/container.js";
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

const pinoError = pino("./logs/error.log");

//const chatFile = new Contenedor(clienteSql, 'chat')
const chatFile = new Contenedor('chat.txt')

async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await chatFile.save(objeto);
    
    if (id.message){
        logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id.message))
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id.message)
    }else
        objeto.id = id

     res.json(objeto)
   
}
 
export {controladorPostChat };