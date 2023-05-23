// Inicializa con los valores la pagina
function inicializa() {
    // Pintar el HTML
    let filtro = muebles.consultarMueblesPorCategoria("todo")
    pintarProductos(filtro)
    habilitaEscuchadorAgregarDeseo()
    habilitaEscuchadorAgregarCarrito()
    habilitaEscuchadoresPorCategoria()
    habilitaEscuchadorPorPalabra()
    actualizarNumeroDeseos()
    actualizarNumeroCarrito()
}

// Pinta los productos en la pantalla
function pintarProductos(lst) {
    // Ubicar el div donde agregar los productos
    let elemRef = document.querySelector(".divProductos .trjs__productos")

    for (const item of lst) {
        let cont = document.createElement("div");
        cont.className = "trj__producto divProductos__marco"
        // Definimos el innerHTML del elemento con una plantilla de texto
        cont.innerHTML = `
        <a class="scale" href="../page/producto.html" title="Ver detalle">
            <img src=${item.imagen} alt=${item.nombre}>
        </a>
        <h5 class="trj__producto__titulo">${item.nombre}</h5>
        <h5 class="trj__producto__titulo"><strong>${item.precio}</strong></h5>
        <div class="trj__producto__iconos">
            <a href="../page/producto.html" title="Ver detalle"><i class="bi bi-eye-fill icono__producto"></i></i></a>
            <a href="#" id=${item.codigo} class="sumarDeseo" title="Lista deseos"><i class="bi bi-heart-fill icono__producto"></i></a>
            <a href="#" id=${item.codigo} class="sumarCarrito" title="Sumar al carro"><i class="bi bi-cart-fill icono__producto"></i></a>
        </div>`;
        elemRef.appendChild(cont)
    }
}

// Control de eventos y funciones para agregar productos a la lista de deseos y carrito
// ------------------------------------------------------------------------------------
function actualizarListaDeseo(codigo) {
    // Sumar producto a la lista
    sumarListaDeseo(codigo)
    // Modificar numero de productos
    actualizarNumeroDeseos()
}

// Sumar producto a la lista de deseos
function sumarListaDeseo(codigo) {
    // Busco mueble en la lista muebles
    prd = muebles.buscarMueble(codigo)
    // Si existe mueble
    if (prd != null) {
        listaDeseos.agregarMueble(prd)
        listaDeseos.mostrarMuebles()
    } else {
        console.log("ERROR. Producto con código: "+codigo+", no exite")
    }
}

// Modificar numero de productos de lista de deseos
function actualizarNumeroDeseos() {
    item = document.getElementById("nroDeseos")
    item.innerText = listaDeseos.lista.length
}

// Sumar producto al carrito
function actualizarCarrito(codigo) {
    // Sumar producto a la lista
    sumarCarrito(codigo)
    // Modificar numero de productos
    actualizarNumeroCarrito()
}

// Sumar producto al carrito
function sumarCarrito(codigo) {
    // Busco mueble en la lista muebles
    prd = muebles.buscarMueble(codigo)
    // Si existe mueble
    if (prd != null) {
        listaCarrito.agregarMueble(prd)
        listaCarrito.mostrarMuebles()
    } else {
        console.log("ERROR. Producto con código: "+codigo+", no exite")
    }
}

// Modificar numero de productos en carrito
function actualizarNumeroCarrito() {
    item = document.getElementById("nroCarrito")
    item.innerText = listaCarrito.lista.length
}

// Control de eventos y funciones para filtrar productos por categoria
// -------------------------------------------------------------------
function filtrarPorCategoria(categoria) {
    // eliminar productos que se ven
    // ubicar el elemento padre de los productos
    let item = document.querySelector(".divProductos .trjs__productos")    
    while (item.firstChild) {
        item.removeChild(item.firstChild);
    }
    // pintar productos
    let filtro = muebles.consultarMueblesPorCategoria(categoria)
    pintarProductos(filtro)

    // Cambiar titulo
    let titulo_categoria = document.getElementById("titulo_categoria")
    if (categoria == "cama") {
        titulo_categoria.innerText = "Camas"
    } else {
        if (categoria == "velador") {
            titulo_categoria.innerText = "Veladores"
        } else {
            if (categoria == "banqueta") {
                titulo_categoria.innerText = "Banquetas"
            } else {
                titulo_categoria.innerText = "Todos los productos"
            }
        } 
    }
    habilitaEscuchadorAgregarDeseo()
    habilitaEscuchadorAgregarCarrito()
}

// Control de eventos y funciones para filtrar productos por palabra
// -----------------------------------------------------------------
function filtrarPorPalabra(e,pal) {
    e.preventDefault()
    // eliminar productos que se ven
    // ubicar el elemento padre de los productos
    let item = document.querySelector(".divProductos .trjs__productos")    
    while (item.firstChild) {
        item.removeChild(item.firstChild);
    }
    // pintar productos
    let filtro = muebles.consultarMuebles("nombre", pal)
    pintarProductos(filtro)

    // Cambiar titulo
    let titulo_categoria = document.getElementById("titulo_categoria")
    titulo_categoria.innerText = ""
    
    habilitaEscuchadorAgregarDeseo()
    habilitaEscuchadorAgregarCarrito()
}

inicializa()