// js/carrito.js

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("carritoLista");

function mostrarCarrito() {
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p
    return;
  }

  let total = 0;
  let html = `
    <table class="table table-dark table-striped text-center align-middle">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unitario</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    html += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio}</td>
        <td>$${subtotal}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <h4 class="text-end mt-3">Total a pagar: $${total}</h4>
  `;

  contenedor.innerHTML = html;
}

document.getElementById("vaciar").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  location.reload();
});

mostrarCarrito();
