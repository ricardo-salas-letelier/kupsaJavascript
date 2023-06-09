// Cargar muebles en lista muebles
function cargarProductos() {
    // Leer archivo json
    const file = "../json/productos.json";
    fetch(file)
        .then(respuesta =>  respuesta.json())
        .then((prds) => {
            // Llenar lista de productos
            for (const item of prds) {
                let obj = new mueble(item.codigo,item.nombre,item.precio,item.cantidad,item.imagen,item.categoria)
                if (!muebles.agregarMueble(obj)) {
                    console.log("ERROR. Producto ya existe. Código: "+item.codigo)
                }
            }
            inicializa()
        })
        .catch(error => console.log("ERROR. Problemas al cargar productos", error))
}

// Inicializa con los valores la pagina
function inicializa() {
    // Sacar de localStorage
    llenarProductosDesdeLocalStorage("deseos", listaDeseos)
    llenarProductosDesdeLocalStorage("carrito", listaCarrito)

    // Pintar el HTML
    let filtro = muebles.consultarMueblesPorCategoria("todo")
    pintarProductos(filtro)
    // Habilitar escuchadores
    habilitaEscuchadorAgregarDeseo()
    habilitaEscuchadorAgregarCarrito()
    habilitaEscuchadoresPorCategoria()
    habilitaEscuchadorPorPalabra()

    actualizarNumeroDeseos()
    actualizarNumeroCarrito()
}

// Sacar de localStorage lista
function llenarProductosDesdeLocalStorage(clave, prds) {
    let list = localStorage.getItem(clave)

    // Cargar productos desde JSON
    let listJSON = JSON.parse(list)
    // Si lista esta con 1 o más productos
    if (listJSON != null) {
        // Borrar elementos de lista
        prds.lista.splice(0, prds.lista.length)

        // Llenar lista de productos
        for (const item of listJSON) {
            let obj = new mueble(item.codigo,item.nombre,item.precio,item.cantidad,item.imagen,item.categoria)
            if (!prds.agregarMueble(obj)) {
                console.log("ERROR. Producto ya existe. Código: "+item.codigo)
            }
        }
    }
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
        <h5 class="trj__producto__titulo"><strong>${item.precio.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}</strong></h5>
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

    Toastify({
        text: "Agrego producto a lista de deseos",
        duration: 2000
    }).showToast();
}

// Sumar producto a la lista de deseos
function sumarListaDeseo(codigo) {
    // Busco mueble en la lista muebles
    let prd = muebles.buscarMueble(codigo)
    // Si existe mueble
    if (prd != null) {
        // Existe en lista de deseos
        let indice = listaDeseos.existeMueble(codigo)
        // Si no existe en lista de deseo
        if (indice < 0) {
            // Crear mueble
            let obj = new mueble(prd.codigo,prd.nombre,prd.precio,0,prd.imagen,prd.categoria)  
            listaDeseos.agregarMueble(obj)
            indice = listaDeseos.existeMueble(codigo)
            listaDeseos.lista[indice].sumarProducto(1)
            listaDeseos.mostrarMuebles()
        } else {
            listaDeseos.lista[indice].sumarProducto(1)
            listaDeseos.mostrarMuebles()
        }
        // Guardar productos en localStorage
        guardarProductosEnLocalStorage("deseos", listaDeseos)
    } else {
        console.log("ERROR. Producto con código: "+codigo+", no exite")
    }
}

// Modificar numero de productos de lista de deseos
function actualizarNumeroDeseos() {
    item = document.getElementById("nroDeseos")
    let acum = listaDeseos.lista.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
    item.innerText = acum
}

// Sumar producto al carrito
function actualizarCarrito(codigo) {
    // Sumar producto a la lista
    sumarCarrito(codigo)
    // Modificar numero de productos
    actualizarNumeroCarrito()

    Toastify({
        text: "Agrego producto al carrito",
        duration: 2000
    }).showToast();
}

// Sumar producto al carrito
function sumarCarrito(codigo) {
    // Busco mueble en la lista carrito
    let prd = muebles.buscarMueble(codigo)
    // Si existe mueble
    if (prd != null) {
        // Existe en lista de carrito
        let indice = listaCarrito.existeMueble(codigo)
        // Si no existe en lista carrito
        if (indice < 0) {
            // Crear mueble
            let obj = new mueble(prd.codigo,prd.nombre,prd.precio,0,prd.imagen,prd.categoria)
            listaCarrito.agregarMueble(obj)
            indice = listaCarrito.existeMueble(codigo)
            listaCarrito.lista[indice].sumarProducto(1)
            listaCarrito.mostrarMuebles()
        } else {
            listaCarrito.lista[indice].sumarProducto(1)
            listaCarrito.mostrarMuebles()
        }
        // Guardar productos en localStorage
        guardarProductosEnLocalStorage("carrito", listaCarrito)
    } else {
        console.log("ERROR. Producto con código: "+codigo+", no exite")
    }
}

// Modificar numero de productos en carrito
function actualizarNumeroCarrito() {
    item = document.getElementById("nroCarrito")
    let acum = listaCarrito.lista.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
    item.innerText = acum
}

// Guardar lista productos en localStorage
function guardarProductosEnLocalStorage(clave,prds) {
    let listJSON = JSON.stringify(prds.lista)
    localStorage.setItem(clave, listJSON);
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

cargarProductos()