
class Producto {
    constructor(nombre, descripcion, precio, stock) {
        this.nombre = nombre
        this.descripcion = descripcion        
        this.precio = parseFloat(precio)
        this.stock = parseFloat(stock)
    }
}




let productos = []



localStorage.getItem('productos') ? productos = JSON.parse(localStorage.getItem('productos')) : localStorage.setItem('productos', JSON.stringify(productos))


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
            mensajeAlerta.innerHTML = `
            <div class="alert alert-danger  m-6" role="alert">                
                <p>Introduzca un valor de precio/stock igual o mayor a 0 </p>
            </div>
            `          
            return            
        } 
        
        if(precio >= 0 || stock >= 0 ){
            
            const producto = new Producto (nombre, descripcion, precio, stock)
            productos.push(producto)    
            localStorage.setItem("productos", JSON.stringify(productos))
            form.reset()
            mensajeAlerta.children[0].remove()        
            console.log(nombre, descripcion, precio, stock)  
        } 
        
        else{ 
            const producto = new Producto (nombre, descripcion, precio, stock)
            productos.push(producto)    
            localStorage.setItem("productos", JSON.stringify(productos))
            form.reset()            
            console.log(nombre, descripcion, precio, stock)
        } 
})



mostrarProductos.addEventListener('click', () => {
    const prodStorage = JSON.parse(localStorage.getItem('productos')) 
    divProductos.innerHTML = ""
    prodStorage.forEach((producto, indice) => {
        divProductos.innerHTML += `
            <div class="card" id="producto${producto.indice}" style="width: 18rem;margin:3px;">
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
            tarjetaProducto.remove()
            productos.splice(indice, 1)
            localStorage.setItem('productos', JSON.stringify(productos))    
            console.log(`${producto.nombre} eliminado`)        

        })              
    })    
})


