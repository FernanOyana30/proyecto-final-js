
class Producto {
    constructor(nombre, descripcion, precio, stock) {
        this.nombre = nombre
        this.descripcion = descripcion        
        this.precio = parseFloat(precio)
        this.stock = parseFloat(stock)
    }
}

const producto1 = new Producto ("Tubo de calamar", "Tubo de calamar para rabas. Precio xkg", 1200, 30)
const producto2 = new Producto ("Cornalitos", "Cornalitos congelados. Precio xkg", 500, 50)

const producto3 = {... producto1}
producto3.nombre = "Calamar entero"
producto3.precio = 700
producto3.descripcion = "Calamar entero con grasa, tentáculos y timón. Ideal para cazuela. Precio xkg"

const producto4 = {... producto1}
producto4.nombre = "Rabas congeladas"
producto4.descripcion = "Rabas precocidas y rebozadas listas para freír. Precio xkg"


const TIENDA_ARRAY = [producto1, producto2, producto3, producto4]

const contenedorTienda = document.getElementById("contenedorTienda")



TIENDA_ARRAY.forEach(producto => {
    contenedorTienda.innerHTML += `    
        <div class="card" id="producto${producto.indice}" style="width: 18rem;margin:3px;">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>   
                <p class="card-text"> ${producto.descripcion}</p>                 
                <p class="card-text"> $${producto.precio}</p>
                <p class="card-text">${producto.stock} disponibles</p>   
                <button class="btn btn-danger">Añadir al carrito</button>                 
            </div>
        </div>  
    `
})

//

let productos = []

if(localStorage.getItem('productos')) { 
    productos = JSON.parse(localStorage.getItem('productos')) 
} else {
    localStorage.setItem('productos', JSON.stringify(productos)) 
}

const form = document.getElementById("form")
const mostrarProductos = document.getElementById("mostrarProductos")
const divProductos = document.getElementById("divProductos")

form.addEventListener('submit', (event) => {
    event.preventDefault() 
    const nombre = document.getElementById("nombreProducto").value
    const descripcion = document.getElementById("descProducto").value
    const precio = document.getElementById("precioProducto").value
    const stock = document.getElementById("stockProducto").value  
    const mensajeAlerta = document.getElementById("mensajeAlerta") 
        if(precio < 0 || stock < 0 ){
            Swal.fire('Introduzca un valor de precio/stock igual o mayor que 0')                                  
            return            
        } 
        
        else if(precio >= 0 || stock >= 0 ){            
            const producto = new Producto (nombre, descripcion, precio, stock)
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
            console.log(nombre, descripcion, precio, stock)  
        }                 
})

mostrarProductos.addEventListener('click', () => {
    const prodStorage = JSON.parse(localStorage.getItem('productos')) 
    divProductos.innerHTML = ""
    prodStorage.forEach((producto, indice) => {
        divProductos.innerHTML += `
            <div class="card" id="producto${indice}" style="width: 18rem;margin:3px;">
                <div class="card-body">                
                    <h5 class="card-title">${producto.nombre}</h5>
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
        tarjetaProducto.children[0].children[4].addEventListener('click', () => {            
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
                    tarjetaProducto.remove()
                    productos.splice(indice, 1)
                    localStorage.setItem('productos', JSON.stringify(productos))    
                    //console.log(`${producto.nombre} eliminado`)
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


