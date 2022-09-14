
class Producto {
    constructor(nombre, categoria, descripcion, precio, stock) {        
        this.nombre = nombre
        this.categoria = categoria
        this.descripcion = descripcion        
        this.precio = parseFloat(precio)
        this.stock = parseFloat(stock)
    }
}

//Array de productos vacío
let productos = []

localStorage.getItem('productos') ? 
    productos = JSON.parse(localStorage.getItem('productos')) //Pasar de JSON a objeto
    :
    localStorage.setItem('productos', JSON.stringify(productos)) //Pasar de objeto a JSON


//Interacción con HTML
const form = document.getElementById("form")
const mostrarProductos = document.getElementById("mostrarProductos")
const divProductos = document.getElementById("divProductos")

//Evento para crear producto
form.addEventListener('submit', (event) => {
  event.preventDefault() 
  const nombre = document.getElementById("nombreProducto").value    
  const categoria = document.getElementById("categoriaProducto").value    
  const descripcion = document.getElementById("descProducto").value
  const precio = document.getElementById("precioProducto").value
  const stock = document.getElementById("stockProducto").value           
    if(precio < 0 || stock < 0 ){ //Si precio o stock son negativos, se cancela la creación del producto
        Swal.fire('Introduzca un valor de precio/stock igual o mayor que 0')                                  
        return            
    } 
    else if(precio == 000000 || stock == 0){ //Si precio o stock son iguales a 0, se cancela la creación del producto
      Swal.fire('Introduzca un valor de precio/stock mayor que 0')                                  
        return
    }    
    else if(precio > 0 || stock > 0 ){ //Si precio o stock son iguales y mayores a 0, el producto es creado.        
        const producto = new Producto (nombre, categoria, descripcion, precio, stock)
        productos.push(producto)    
        localStorage.setItem("productos", JSON.stringify(productos))
        form.reset()               
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: '¡Producto creado!',
            showConfirmButton: false,
            timer: 1500
          })    
        console.log(nombre, categoria, descripcion, precio, stock)  
    }   
})

//Evento para mostrar productos creados
mostrarProductos.addEventListener('click', () => {
  const prodStorage = JSON.parse(localStorage.getItem('productos')) 
  divProductos.innerHTML = ""
  prodStorage.forEach((producto, indice) => {
    divProductos.innerHTML += `
        <div class="card" id="producto${indice}" style="width: 18rem;margin:3px;">
            <div class="card-body">                                    
                <h5 class="card-title">${producto.nombre}</h5>                    
                <p class="card-text"> ${producto.categoria}</p>                 
                <p class="card-text"> ${producto.descripcion}</p>                 
                <p class="card-text"> $${producto.precio}</p>
                <p class="card-text">${producto.stock} disponibles</p>   
                <button class="btn btn-danger">Eliminar</button>                 
            </div>
        </div>        
    `        
  })
  
  prodStorage.forEach((producto, indice) => {
      const tarjetaProducto = document.getElementById(`producto${indice}`)        
      tarjetaProducto.children[0].children[5].addEventListener('click', () => { //Eliminar productos guardados            
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })              
            swalWithBootstrapButtons.fire({
              title: '¿Estás seguro?',
              text: "No podrás revertir esto.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Eliminar',
              cancelButtonText: 'Cancelar',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                  tarjetaProducto.remove()//Eliminar del DOM
                  productos.splice(indice, 1)//Eliminar del Array
                  localStorage.setItem('productos', JSON.stringify(productos))//Eliminar del Local Storage    
                  console.log(`${producto.nombre} eliminado`)
                swalWithBootstrapButtons.fire(                
                  'Producto eliminado',
                  'Tu producto ha sido eliminado con éxito.'
                )
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelado',
                  'Tu producto sigue disponible',
                  'error'
                )
              }
            })
      })              
  })    
})


