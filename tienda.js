class Producto {
    constructor(img, nombre, descripcion, precio, stock) {        
        this.img = img
        this.nombre = nombre
        this.descripcion = descripcion        
        this.precio = parseFloat(precio)
        this.stock = parseFloat(stock)
    }
}

const producto1 = new Producto ("../img/tubo-calamar.jpg", "Tubo de calamar", "Tubo de calamar para rabas. Precio xkg", 1200, 30)
const producto2 = new Producto ("../img/cornalitos-congelados.jpg", "Cornalitos", "Cornalitos congelados. Precio xkg", 500, 50)

const producto3 = {... producto1}
producto3.img = "../img/calamar-entero.jpg"
producto3.nombre = "Calamar entero"
producto3.precio = 700
producto3.descripcion = "Calamar entero con grasa, tentáculos y timón. Ideal para cazuela. Precio xkg"

const producto4 = {... producto1}
producto4.img = "../img/rabas-precocidas.jpg"
producto4.nombre = "Rabas congeladas"
producto4.descripcion = "Rabas precocidas y rebozadas listas para freír. Precio xkg"


const TIENDA_ARRAY = [producto1, producto2, producto3, producto4]

const contenedorTienda = document.getElementById("contenedorTienda")

TIENDA_ARRAY.forEach(producto => {
    contenedorTienda.innerHTML += `    
        <div class="card" id="producto${producto.indice}" style="width: 18rem;margin:3px;">
            <img src="./img/${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>   
                <p class="card-text"> ${producto.descripcion}</p>                 
                <p class="card-text"> $${producto.precio}</p>
                <p class="card-text">${producto.stock} disponibles</p>   
                <button class="btn btn-primary">Añadir al carrito</button>                 
            </div>
        </div>  
    `
})

const contenedorTienda2 = document.getElementById("contenedorTienda2")

fetch('./json/productos.json')
.then(response => response.json())
.then(productos => {
    productos.forEach((producto, indice) => {
        contenedorTienda2.innerHTML += 
        `
        <div class="card" id="product${indice}" style="width: 18rem;margin:3px;">
            <img src="./img/${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>   
                <p class="card-text"> ${producto.descripcion}</p>                 
                <p class="card-text"> $${producto.precio}</p>
                <p class="card-text">${producto.stock} disponibles</p>
                <button class="btn btn-primary">Añadir al carrito</button>                 
            </div>
        </div>  
        `
    });
    
})

