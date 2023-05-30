// Clase mueble
class mueble {
    codigo = ""
    nombre = ""
    precio = 0
    cantidad = 0
    imagen = ""
    categoria = ""

    constructor(codigo, nombre, precio, cantidad, imagen, categoria) {
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.imagen = imagen
        this.categoria = categoria
    }

    sumarProducto(cantidad) {
        if (this.cantidad + cantidad >= 0) {
            this.cantidad = this.cantidad + cantidad
        } else {
            this.cantidad = 0
        }
    }

    getNombre() {
        return this.nombre
    }

    getCantidad() {
        return this.cantidad
    }

    getPrecio() {
        return this.precio
    }
}

// Clase para gestionar lista de productos
class productos {
    lista = [];

    constructor () {
        this.lista = [];
    }

    // OK Retorna indice del arreglo. Un valor mayor o igual a 0 si esta, en contrario retorna -1
    existeMueble(codigo) {
        let index = this.lista.findIndex(function(m) {
            return m.codigo == codigo;
        })
        return index
    }

    // OK
    mostrarMuebles() {
        console.table(this.lista)
    }

    // OK
    ordenarMuebles(criterio, orden) {
        if (criterio.toLowerCase() == "nombre" && orden == "A") {
            // ordenar por nombre en orden ascendente
            this.lista.sort((a,b) => {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                // a es igual a b
                return 0;
            })
        } else {
            if (criterio.toLowerCase() == "nombre" && orden == "D") {
                // ordenar por nombre en orden descendente
                this.lista.sort((a,b) => {
                    if (a.nombre < b.nombre) {
                        return 1;
                    }
                    if (a.nombre > b.nombre) {
                        return -1;
                    }
                    // a es igual a b
                    return 0;
                })
            } else {
                if (criterio.toLowerCase() == "precio" && orden == "A") {
                    // ordenar por precio en orden ascendente
                    this.lista.sort((a,b) => a.precio - b.precio) 
                } else {
                    if (criterio.toLowerCase() == "precio" && orden == "D") {
                        // ordenar por precio en orden descendente
                        this.lista.sort((a,b) => b.precio - a.precio)
                    }
                }
            }
        }
    }

    // Ok
    consultarMuebles(criterio, valor) {
        if (criterio.toLowerCase() == "nombre") {
            // los muebles que contengan esa palabra
            return this.lista.filter((m) => m.nombre.includes(valor)) 
        } else {
            if (criterio.toLowerCase() == "precio") {
                // los muebles cuyo precio sea mayor o igual
                const filtro = this.lista.filter((m) => m.precio >= valor) 
                return filtro
            }
        }
    }

    // Ok
    consultarMueblesPorCategoria(valor) {
        if (valor.toLowerCase() == "todo") {
            // retornar lista completa
            return this.lista 
        } else {
            // retornar solo los productos de la categoria
            return this.lista.filter((m) => m.categoria.includes(valor))
        }
    }

    // OK Retorna un objeto mueble
    buscarMueble(codigo) {
        let indice = this.existeMueble(codigo)
        if (indice >= 0) {
            return this.lista[indice]
        } else {
            return null
        }
    }

    // OK
    agregarMueble(producto) {
        if (this.existeMueble(producto.codigo) >= 0) {
            // Error. Producto ya existe
            return false
        } else {
            // Agregar producto
            this.lista.push(producto)
            return true
        }
    }

    // OK
    eliminarMueble(texto) {
        let indice = this.existeMueble(texto)
        if (indice >= 0) {
            // Eliminar producto
            this.lista.splice(indice, 1)
            return true
        } else {
            // Error. Producto no existe
            return false
        }
    }
}
