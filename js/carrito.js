document.addEventListener("DOMContentLoaded", function () {
  const productos = document.querySelectorAll('.items');
  const carritoLista = document.getElementById('carrito-lista');
  const totalElemento = document.getElementById('total');
  const cantidadItemsSpan = document.getElementById('cantidad-items');
  const montoTotalSpan = document.getElementById('monto-total');
  let carrito = [];

  productos.forEach(producto => {
      const botonAgregar = producto.querySelector('.agregar-carrito');
      botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
  });

  carritoLista.addEventListener('click', eliminarDelCarrito);

  function agregarAlCarrito(productoSeleccionado) {
      const productoId = productoSeleccionado.getAttribute('data-id');
      const productoNombre = productoSeleccionado.getAttribute('data-nombre');
      const productoPrecio = parseFloat(productoSeleccionado.getAttribute('data-precio'));

      const existeEnCarrito = carrito.find(item => item.id === productoId);

      if (existeEnCarrito) {
          existeEnCarrito.cantidad++;
      } else {
          carrito.push({ id: productoId, nombre: productoNombre, precio: productoPrecio, cantidad: 1 });
      }

      mostrarCarrito();
  }

  function eliminarDelCarrito(event) {
      if (event.target.tagName === 'SPAN') {
          const productoId = event.target.getAttribute('data-id');
          carrito = carrito.filter(item => item.id !== productoId);
          mostrarCarrito();
      }
  }

  function mostrarCarrito() {
      carritoLista.innerHTML = '';
      totalElemento.textContent = calcularTotal().toFixed(2);

      carrito.forEach(item => {
          const li = document.createElement('li');
          const spanEliminar = document.createElement('span');
          spanEliminar.textContent = 'x';
          spanEliminar.setAttribute('data-id', item.id);
          li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
          li.appendChild(spanEliminar);
          carritoLista.appendChild(li);
      });

      actualizarResumenCarrito();
  }
    //calcula el total de la compra
  function calcularTotal() {
      return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
    // actualiza cada vez que se seleccione un producto
  function actualizarResumenCarrito() {
      const cantidadItems = carrito.length;
      const montoTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio), 0);

      cantidadItemsSpan.textContent = cantidadItems;
      montoTotalSpan.textContent = montoTotal;

      //mostrar u ocultar el resumen del carrito 
      const carritoResumen = document.getElementById("carrito-resumen");
      carritoResumen.style.display = cantidadItems > 0 ? "block" : "none";
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const carritoIcono = document.getElementById('carrito-icono');
  const carrito = document.getElementById('carrito');

  carritoIcono.addEventListener('click', function () {
      // Muestra o oculta el contenido del carrito
      carrito.style.display = carrito.style.display === 'none' ? 'block' : 'none';
  });
});
