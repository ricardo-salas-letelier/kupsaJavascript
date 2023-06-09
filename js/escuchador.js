// Escuchadores para agregar productos a la lista de deseos y carrito
// ------------------------------------------------------------------
function habilitaEscuchadorAgregarDeseo() {
    let deseos = document.getElementsByClassName("sumarDeseo");
    for (const item of deseos) {
        item.addEventListener("click", () => {actualizarListaDeseo(item.id)})
    }
}
function habilitaEscuchadorAgregarCarrito() {
    let carrito = document.getElementsByClassName("sumarCarrito");
    for (const item of carrito) {
        item.addEventListener("click", () => {actualizarCarrito(item.id)})
    }
}

// Escuchadores para filtrar productos por categoria
// --------------------------------------------------
function habilitaEscuchadoresPorCategoria() {
    let catCama = document.getElementById("catCamas");
    catCama.addEventListener("click", () => {filtrarPorCategoria("cama")})
    let catCamaFooter = document.getElementById("catCamasFooter");
    catCamaFooter.addEventListener("click", () => {filtrarPorCategoria("cama")})
    
    let catVeladores = document.getElementById("catVeladores");
    catVeladores.addEventListener("click", () => {filtrarPorCategoria("velador")})
    let catVeladoresFooter = document.getElementById("catVeladoresFooter");
    catVeladoresFooter.addEventListener("click", () => {filtrarPorCategoria("velador")})
    
    let catBanquetas = document.getElementById("catBanquetas");
    catBanquetas.addEventListener("click", () => {filtrarPorCategoria("banqueta")})
    let catBanquetasFooter = document.getElementById("catBanquetasFooter");
    catBanquetasFooter.addEventListener("click", () => {filtrarPorCategoria("banqueta")}) 
    
    let todosProductos = document.getElementById("todosProductos");
    todosProductos.addEventListener("click", () => {filtrarPorCategoria("todo")})
    let productsAll = document.getElementById("productsAll");
    productsAll.addEventListener("click", () => {filtrarPorCategoria("todo")}) 
}

// Escuchador para filtrar productos por palabra
// ---------------------------------------------
function habilitaEscuchadorPorPalabra() {
    let formularioBusqueda = document.getElementById("formularioBusqueda");
    let palabra = document.getElementById("campoBusqueda");
    formularioBusqueda.addEventListener("submit", (event) => {filtrarPorPalabra(event, palabra.value); formularioBusqueda.reset()})
}
