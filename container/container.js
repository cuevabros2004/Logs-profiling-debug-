import { promises } from "fs";

class Contenedor{

    #productos;
    #chat;
    #filename;

    constructor(filename) {
        this.#chat = [];
        this.#productos = [];
        this.#filename = filename;
   }


   //Productos
    async save(objeto){
 
        try {
           if(await this.getAll())
            this.#productos = await this.getAll()
        } 
        catch (error){
            this.#productos = [];
           return error
        } 

        try {
            this.#productos.push(objeto)
            await promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return   this.#productos[this.#productos.length - 1].id
        }
        catch(error){
           return error
        } 

      }

      

    async getById(id){
       
        try {
            this.#productos = await this.getAll()

            const objetoBuscado = this.#productos.find((p)=>p.id===id)

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            return error
        } 

     }

    
     async getAll(){

        try {
            const contenido = JSON.parse(await promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#productos = contenido
                 return this.#productos
                } else { 
                 return null
                }
            }

        catch(error){
            return error
        } 

    }


    //Chat
    async save_Chat(objeto){
        try {
            if(await this.getAll_Chat())
             this.#chat = await this.getAll_Chat()
         } 
         catch (error){
             this.#chat = [];
             return error
         } 
 
         try {
             this.#chat.push(objeto)
             await promises.writeFile(this.#filename, JSON.stringify(this.#chat, null, 2))
             return 'Id del objeto guardado: ' + this.#chat[this.#chat.length - 1].id
         }
         catch(error){
             return error
         } 
    }

    async getAll_Chat(){

        try {
            const contenido = JSON.parse(await promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#chat = contenido
                 return this.#chat
                } else { 
                 return null
                }
            }

        catch(error){
            return error
        } 
    }

  }



  
export  default Contenedor ;
