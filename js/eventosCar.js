// Inicializa con los valores la pagina
function inicializa() {
    // Sacar de localStorage
    llenarProductosDesdeLocalStorage("carrito", listaCarrito)

    // Pintar el HTML
    listarCarrito(listaCarrito.lista)
    
    // Habilitar escuchadores
    habilitaEscuchadorDisminuirCarrito()
    habilitaEscuchadorAumentarCarrito()
    actualizarResumen(listaCarrito)
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

// Pinta los productos del carrito en la pantalla
function listarCarrito(lst) {
    // Ubicar el div donde agregar los productos
    let elemRef = document.querySelector(".divLista .container")

    for (const item of lst) {
        let cont = document.createElement("div");
        let subTotal = item.precio * item.cantidad
        cont.className = "row lineaAbajo anchoLinea"
        cont.id = "linea"+item.codigo
        // Definimos el innerHTML del elemento con una plantilla de texto
        cont.innerHTML = `
            <div class="col">${item.codigo}</div>
            <div class="col">${item.nombre}</div>
            <div class="col">
                <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    <button type="button" id=${item.codigo} class="btn btn-outline-primary restarCarrito">-</button>
                    <button type="button" class="btn btn-outline-primary cantidad${item.codigo}" disabled>${item.cantidad}</button>
                    <button type="button" id=${item.codigo} class="btn btn-outline-primary sumarCarrito">+</button>
                </div>
            </div>
            <div class="col montos">
                ${item.precio.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}
            </div>
            <div class="col montos subtotal${item.codigo}">
                ${subTotal.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}
            </div>`;
        elemRef.appendChild(cont)
    }
}

// Control de eventos y funciones para agregar productos a la lista de carrito
// ---------------------------------------------------------------------------

// Sumar producto al carrito
function actualizarCarrito(codigo, numero) {
    // Recuperar indice del producto en la lista
    let indice = listaCarrito.existeMueble(codigo)
    // Sumar numero a la cantidad de producto
    listaCarrito.lista[indice].sumarProducto(numero)
    //Recuperar total de cantidad de producto
    let cantidad = listaCarrito.lista[indice].getCantidad()
    listaCarrito.mostrarMuebles()

    // Modificar cantidad de producto
    actualizarNumeroCarrito(codigo, cantidad)

    // Modificar subtotal de producto
    let subtotal = listaCarrito.lista[indice].getCantidad() * listaCarrito.lista[indice].getPrecio()
    actualizarSubtotalCarrito(codigo, subtotal)

    // Modificar resumen de productos
    actualizarResumen(listaCarrito)

    // Si cantidad es cero
    if (cantidad == 0) {
        // Eliminar linea
        eliminarLinea(codigo)
        // Eliminar producto de carrito
        listaCarrito.eliminarMueble(codigo)
    }

    // Guardar productos en localStorage
    guardarProductosEnLocalStorage("carrito", listaCarrito)    
}

// Modificar numero de productos en carrito
function actualizarNumeroCarrito(codigo, cantidad) {
    item = document.querySelector(".btn-group-sm .cantidad"+codigo)
    item.innerText = cantidad
}

// Modificar numero de productos en carrito
function actualizarSubtotalCarrito(codigo, subtotal) {
    item = document.querySelector(".subtotal"+codigo)
    item.innerText = `${subtotal.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}`
}
// Guardar lista productos en localStorage
function guardarProductosEnLocalStorage(clave,prds) {
    let listJSON = JSON.stringify(prds.lista)
    localStorage.setItem(clave, listJSON);
}

function actualizarResumen(prds) {
    let total = prds.lista.reduce((acumulador, elemento) => acumulador + elemento.precio*elemento.cantidad, 0)
    let subtotal = total / (IVA + 1)
    let impuesto = total - subtotal

    // Identificar los elementos del documento
    let itemSubtotal = document.getElementById("Sub-total")
    itemSubtotal.innerText = `${subtotal.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}`
    let itemImpuesto = document.getElementById("Impuesto")
    itemImpuesto.innerText = `${impuesto.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}`
    let itemTotal = document.getElementById("Total")
    itemTotal.innerText = `${total.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })}`
}

function eliminarLinea(codigo) {
    itemLinea = document.getElementById("linea"+codigo)
    itemLinea.remove()
}

inicializa()