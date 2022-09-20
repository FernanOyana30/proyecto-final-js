class Producto {
    constructor(id, img, nombre, categoria, descripcion, precio, stock, cantidad) {        
        this.id = id
        this.img = img
        this.nombre = nombre
        this.categoria = categoria
        this.descripcion = descripcion        
        this.precio = parseFloat(precio)
        this.stock = parseFloat(stock)
        this.cantidad = parseFloat(cantidad)
    }            
}

const producto1 = new Producto (1, "../img/tubo-calamar.jpg", "Tubo de calamar", "Mariscos", "Tubo de calamar para rabas. Precio xkg", 1200, 30, 1)
const producto2 = new Producto (2, "../img/cornalitos-congelados.jpg", "Cornalitos", "Pescados", "Cornalitos congelados crudos. Precio xkg", 500, 50, 1)

//Spread para duplicar objetos
const producto3 = {... producto1}
producto3.id = 3
producto3.img = "../img/calamar-entero.jpg"
producto3.nombre = "Calamar entero"
producto3.categoria = "Mariscos"
producto3.precio = 700
producto3.descripcion = "Calamar con grasa, tentáculos y timón para cazuela. Precio xkg"

const producto4 = {... producto1}
producto4.id = 4
producto4.img = "../img/rabas-precocidas.jpg"
producto4.nombre = "Rabas congeladas"
producto4.categoria = "Rebozados"
producto4.descripcion = "Rabas precocidas y rebozadas listas para freír. Precio xkg"

//Array tienda
const stockProductos = [    
    producto1, producto2, producto3, producto4
]

//DOM
const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('contenedorCarrito')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contador-carrito')
const precioTotal = document.getElementById('precio-total')

//Carrito
let carrito = []

//Local Storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//Mostrar tarjetas de productos en venta
stockProductos.forEach((producto) => {
    const div = document.createElement('div')       
    div.classList.add('tarjeta') 
    div.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="./img/${producto.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.categoria}</p>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-text">${producto.stock} disponibles</p>
            <button class="btn btn-success" id="agregar${producto.id}">Agregar al carrito</button>
        </div>
    </div>
    `
    contenedorProductos.appendChild(div)
    contenedorProductos.classList.add('contenedorProductos')
    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

//Agregar al carrito
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){
        const prod = carrito.map ( prod => {
            if (prod.id === prodId ){
                prod.cantidad++
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    } else {
        const item = stockProductos.find ((prod) => prod.id === prodId)        
        carrito.push(item)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })
    }      
    actualizarCarrito()    
    console.log('Producto agregado al carrito')    
} 

//Actualizar carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">               
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.categoria}</p>                
                <p class="card-text">$${prod.precio}</p>                
                <p class="card-text">Cantidad: ${prod.cantidad}</p>
                <button class="btn btn-danger" onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
            </div>
        </div>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    precioTotal.innerText = carrito.reduce((acc , prod)=> acc + prod.precio * prod.cantidad,0)
}

//Eliminar del carrito
const eliminarDelCarrito = (prodId) => {  
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
    console.log('Producto eliminado del carrito')  
    

}

//Evento vaciar carrito
vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
    console.log('El carrito está vacío')
})

////////////////////////////
//Fetch para obtener productos de archivo .json
const contenedorTienda2 = document.getElementById("contenedorTienda2")

fetch('./json/productos.json')
.then(response => response.json())
.then(productos => {
    productos.forEach((producto) => {
    const div = document.createElement('div')       
    div.classList.add('tarjeta') 
    div.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="./img/${producto.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.categoria}</p>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-text">${producto.stock} disponibles</p>
            <button class="btn btn-success" id="agregar${producto.id}">Agregar al carrito</button>
        </div>
    </div>
    `
    contenedorTienda2.appendChild(div)
    contenedorTienda2.classList.add('contenedorProductos')
    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
    });    
    //Agregar al carrito
    const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){
        const prod = carrito.map ( prod => {
            if (prod.id === prodId ){
                prod.cantidad++
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    } else {
        const item = productos.find ((prod) => prod.id === prodId)
        carrito.push(item)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })
    }      
    actualizarCarrito()    
    console.log('Producto agregado al carrito')
    }
})

//Finalizar compra
const botonCompra = document.getElementById('botonCompra')

botonCompra.addEventListener('click', () =>{
    if (carrito.length == 0) {
        Swal.fire('¡Tu carrito está vacío! Agrega un producto de la tienda para finalizar la compra.')
        console.log("El carrito está vacío.")
    } else {
        const swalWithBootstrapButtons = Swal.mixin({ //Alerta 
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Estás a punto de comprar',
            text: `Vas a pagar $${precioTotal.innerText}. ¿Estás seguro?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, pagar!',
            cancelButtonText: '¡Todavía no!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                '¡Compra finalizada con éxito!',
                'Te enviaremos tus productos a domicilio.',
                'success'
              )                
                carrito.length = 0
                localStorage.setItem('carrito', JSON.stringify(carrito))
                actualizarCarrito()
                console.log('El carrito está vacío')                
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                '¡Compra cancelada!',
                'Esperamos que vuelvas pronto.',
                'error'
              )
            }
          })
    }    
})