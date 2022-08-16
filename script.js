class Producto {
    constructor(nombre, descripcion, precio, stock) {
        this.nombre = nombre
        this.descripcion = descripcion        
        this.precio = parseFloat(precio)
        this.stock = parseFloat(stock)
    }
}

const form = document.getElementById("form")
const mostrarProductos = document.getElementById("mostrarProductos")
const misProductos = document.getElementById("misProductos")

const productos = []

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const nombre = document.getElementById("nombreProducto").value
    const descripcion = document.getElementById("descProducto").value
    const precio = document.getElementById("precioProducto").value
    const stock = document.getElementById("stockProducto").value      
        if(precio < 0 ){
            alert("Introduzca un valor de precio igual o mayor a 0")             
        }    
        if(stock < 0 ){
            alert("Introduzca un valor de stock igual o mayor a 0") 
        }       
        else{
            const producto = new Producto (nombre, descripcion, precio, stock)
            productos.push(producto)    
            form.reset()
            console.log(productos)            
        }      
})

mostrarProductos.addEventListener('click', () => {
    divUsers.innerHTML = ""
    productos.forEach((producto, indice) => {
        divUsers.innerHTML += `
            <div class="card" id="user${indice}" style="width: 18rem;margin:3px;">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>   
                    <p class="card-text"> ${producto.descripcion}</p>                 
                    <p class="card-text"> $${producto.precio}</p>
                    <p class="card-text">${producto.stock} disponibles</p>
                    
                </div>
            </div>        
        `        
    })
})
