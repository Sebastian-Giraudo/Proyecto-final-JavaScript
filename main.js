/*Array para el carrito*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Referencias */

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const modalCarritoProductos = document.querySelector("#modal-carrito-productos");
const modalCarritoTotal = document.querySelector("#modal-carrito-total");
const btnConfirmarCompra = document.querySelector("#confirmar-compra");
const mensajeCompra = document.querySelector("#mensaje-compra");
const carritoToggle = document.querySelector("#carrito-toggle");
const carritoCantidad = document.querySelector("#carrito-cantidad");


/* Carga de productos a la página usando Fetch */
fetch('./productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        return response.json();
    })
    .then(productos => {
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
            });

            div.append(button);
            contenedorProductos.append(div);
        });
        actualizarCarrito(); 
    })
    .catch(error => {
        console.error('Error:', error);
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
    actualizarContadorCarrito();
}

function borrarDelCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    if (itemEncontrado) {
        itemEncontrado.cantidad--;  /* Reduce la cantidad en 1 al borrar*/

        /* Si la cantidad llega a 0, lo eliminamos del carrito */
        if (itemEncontrado.cantidad === 0) {
            carrito = carrito.filter((item) => item.id !== producto.id);
        }
    }
    actualizarCarrito();
    actualizarContadorCarrito();
}


function actualizarTotal() {
    let total = carrito.reduce((acc,prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

actualizarCarrito();
actualizarContadorCarrito();


/* Función para mostrar el detalle de la compra */

function mostrarDetalleCompra() {
    if (carrito.length > 0) {
        modalCarritoProductos.innerHTML = ""; /* Limpia el contenido anterior */
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h6>${producto.titulo} (x${producto.cantidad}) - $${producto.precio * producto.cantidad}</h6>
            `;
            modalCarritoProductos.append(div);
        });
        modalCarritoTotal.innerText = carritoTotal.innerText; /* Mostrar total del carrito */
    }
}

/* Evento al hacer clic en el botón "Finalizar compra" */
document.querySelector("#btn-finalizar").addEventListener("click", mostrarDetalleCompra);

/* Evento para confirmar la compra */
btnConfirmarCompra.addEventListener("click", () => {
    /*  Mostrar mensaje de agradecimiento */
    mensajeCompra.classList.remove("d-none");

    /* Vacía el carrito y actualiza la página */
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    actualizarContadorCarrito();

    /* Ocultar el modal */
    const modal = bootstrap.Modal.getInstance(document.querySelector('#modalCompra'));
    modal.hide();    
    setTimeout(() => {
        mensajeCompra.classList.add("d-none");
    }, 5000);  /* Oculta el mensaje después de 5 segundos */
});


/* Función para actualizar la cantidad de productos en el ícono del carrito */

function actualizarContadorCarrito() {
    const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.querySelector("#carrito-cantidad").innerText = cantidadTotal;
}


/*  Evento para mostrar/ocultar el carrito */

carritoToggle.addEventListener("click", () => {
    const carritoSection = document.querySelector(".carrito-section");
    carritoSection.style.display = carritoSection.style.display === "none" ? "block" : "none";
    actualizarCantidadCarrito();
});









