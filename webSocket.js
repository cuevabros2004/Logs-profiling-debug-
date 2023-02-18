import Contenedor from "./container/containerDb.js"
import ContenedorChat from "./container/container.js"
import { clienteSql } from './db/clienteSql.js';
import { normalize, schema } from "normalizr";
import util from 'util'



export default function webSocket(io) {
    
const contenedor = new Contenedor(clienteSql, 'productos');
const contenedorChat = new ContenedorChat('chat.txt');

let mensajes = []

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

io.on('connection', async (socket) => {
  // "connection" se ejecuta la primera vez que se abre una nueva conexión
  //console.log('Usuario conectado')

  const productos = await contenedor.getAll();

  if (productos) {
    let mensajeProductos = ""

    mensajeProductos = mensajeProductos + `<div id="productosFake"><b>PRODUCTOS DESDE LA BASE DE DATOS</b></div>`;
    mensajeProductos = mensajeProductos + `<td><b>Nombre:</b></td> <td><b>Precio: </b> </td> <td><b>Imágen</b></td>`;

    productos.forEach(p => {
      mensajeProductos = mensajeProductos + `<tr><td>${p.title}</td> <td width="100px">${p.price}</td> <td><img width="70px" src=${p.thumbnail} alt="Imagen producto"/></td><tr>`
    });
    socket.emit('mensajesActualizados', mensajeProductos);
  }

  const chat = await contenedorChat.getAll();


  if (chat) {
    const id = Math.floor(Math.random() * 99999)

    const data = {
      id: id,
      posts: chat
    }

    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
    const schemaMensaje = new schema.Entity('mensajesChat', { author: schemaAuthor });
    const schemaMensajes = new schema.Entity('posts', { author: schemaAuthor, posts: [schemaMensaje] });

    const normalizedMensajesChat = normalize(data, schemaMensajes);
   // print(normalizedMensajesChat)

    socket.emit('mensajesChatActualizados', normalizedMensajesChat);
  }

  socket.on('mensajes', data => {
    data.socketid = socket.id

    io.sockets.emit('mensajesActualizados', `<tr><td>${data.title}</td> <td width="100px">${data.price}</td> <td><img width="70px" src=${data.thumbnail} alt="Imagen producto"/></td><tr>`);
  })

  socket.on('mensajesChat', data => {
    data.socketid = socket.id

    //Normalización   
    const mensajesChat = {
      id: data.id,
      author: {
        id: data.author.id,
        email: data.author.email,
        nombre: data.author.nombre,
        apellido: data.author.apellido,
        edad: data.author.edad,
        alias: data.author.alias,
        avatar: data.author.avatar
      },
      fecha: data.fecha,
      text: data.text
    }
    console.log(mensajesChat)
    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
    const schemaMensaje = new schema.Entity('mensajesChat', { author: schemaAuthor });

    const normalizedMensajesChat = normalize(mensajesChat, schemaMensaje);

    //print(normalizedMensajesChat)
    io.sockets.emit('mensajesChatActualizados', normalizedMensajesChat);

  })
 

})

}