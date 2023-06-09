// Escuchadores para agregar productos a la lista de deseos y carrito
// ------------------------------------------------------------------
function habilitaEscuchadorDisminuirCarrito() {
    let deseos = document.getElementsByClassName("restarCarrito");
    for (const item of deseos) {
        item.addEventListener("click", () => {actualizarCarrito(item.id, -1)})
    }
}
function habilitaEscuchadorAumentarCarrito() {
    let carrito = document.getElementsByClassName("sumarCarrito");
    for (const item of carrito) {
        item.addEventListener("click", () => {actualizarCarrito(item.id, 1)})
    }
}

function habilitaEscuchadorPasarPorCaja() {
    let pasarPorCaja = document.getElementById("pasarPorCaja");
    pasarPorCaja.addEventListener("click", () => {msgPasarPorCaja()})
}

