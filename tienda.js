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



