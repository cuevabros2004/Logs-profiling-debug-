

class ContenedorDb{

    cliente;
    table;

    constructor(cliente, tabla) {
        this.cliente = cliente;
        this.tabla = tabla;
   }


   //Productos
    async save(objeto){
 
        try {
            await this.cliente(this.tabla).insert(objeto)
            return 'Id del objeto guardado: ' + objeto
        }
        catch(error){
           return error
        } 

      }

    
     async getAll(){

        try {
            const contenido = this.cliente(this.tabla).select()

                if(contenido) { 
                     return contenido
                } else { 
                    return null
                }
            }

        catch(error){
            return error
        } 

    }

    async getProductosTest(){

        class productosTest {
            constructor(id, title, price, thumbnail){
                this.id = id;
                this.title = title;
                this.price = price;
                this.thumbnail = thumbnail
            }
        }
        const productosTestArray = []

        for (let i = 0; i < 5; i++) {                
                productosTestArray.push(new productosTest(i, faker.commerce.productDescription(), faker.commerce.price(), faker.image.nature()))
         }
          return productosTestArray

        }
      
  }


  const Contenedor = ContenedorDb
  export  default Contenedor;
