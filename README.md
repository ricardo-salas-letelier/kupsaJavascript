# Kupsa Muebles

La funcionalidad desarrollada se puede observar en las siguientes paginas:
* Opción de menú "Productos"
   * Los productos desplegados son cargados desde archivo "productos.json"
* Opción carrito de compra, al extremo derecho del menu

Tanto el carrito como la listas de deseo se almacena en localStorage

## Productos
A través de esta página se pueden realizar las siguientes funcionalidades:
* Sumar productos a carrito de compra o lista de deseo
   * Despliegue de lista de deseo, no esta implementada
   * Cada vez que se suma un producto se despliega mensaje.
* Filtrar productos por categoria (opciones a la izquierda de la pantalla)
* Filtrar productos a través de la opción de busqueda, del menú.
* Desplegar carrito de compra.

## Carrito de compra
A través de esta página se pueden realizar las siguientes funcionalidades:
* Para cada producto en el carrito de compra se puede sumar o restar productos
   * Si la cantidad de productos es cero, se elimina producto del carrito
   * Se actualiza sección "Resumen", del carrito
* El botón "Pasar por caja", despliega mensaje
   * Botón se deshabilita cuando se eliminan todos los productos del carrito.

