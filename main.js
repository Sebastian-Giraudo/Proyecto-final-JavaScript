/*Array con productos para cargar en la página*/

const productos = [
    {
        id: "producto01",
        titulo: "Fonología Gourmet",
        precio: 90000,
        img: "./img/img1.jpg",
    },
    {
        id: "producto02",
        titulo: "La mudanza",
        precio: 90000,
        img: "./img/img2.jpg",
    },
    {
        id: "producto03",
        titulo: "Conexión semántica",
        precio: 45000,
        img: "./img/img3.jpg",
    },
    {
        id: "producto04",
        titulo: "Lenguaje en acción",
        precio: 48000,
        img: "./img/img4.jpg",
    },
    {
        id: "producto05",
        titulo: "La colmena léxica",
        precio: 90000,
        img: "./img/img5.jpg",
    },
    {
        id: "producto06",
        titulo: "Abro & Cuento",
        precio: 90000,
        img: "./img/img6.jpg",
    }
];

/*Array para el carrito*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Referencias */

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");


/* Carga de productos a la página */

productos.forEach((producto) => {

    let div = document.createElement("div");
    div.classList.add("producto");
    

    div.innerHTML = `
        <img class="producto-img" src=${producto.img}>
        <h5>${producto.titulo}</h5>
        <p>$${producto.precio}</p>
    `;           

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);

    contenedorProductos.append(div);
});

/* Funciones para el carrito */

function actualizarCarrito(){
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h6>${producto.titulo}</h6>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.precio * producto.cantidad}</p>
            `;
            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");            
            button.innerText = "❌";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto); 
            })
        
            div.append(button);
            carritoProductos.append(div);

        })
    }
    actualizarTotal();
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


function agregarAlCarrito(producto) {    
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado){
        itemEncontrado.cantidad++;
    }else {
        carrito.push({...producto, cantidad: 1});
    }    
    
    actualizarCarrito();
}

function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    let total = carrito.reduce((acc,prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

actualizarCarrito();









