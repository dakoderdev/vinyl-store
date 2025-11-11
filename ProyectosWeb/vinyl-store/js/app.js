const lista = document.getElementById("listaProductos");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (lista) { 
  productos.forEach((prod, index) => {
  const id = index + 1;
  const col = document.createElement("div");
  col.classList.add("col-md-4");
  col.innerHTML = `
    <div class="card h-100 bg-black text-light" data-id="${id}"> <img src="public/${prod.img}" class="card-img-top producto-img" alt="${prod.nombre}">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-precio card-text">$${prod.precio}</p>
        </div>
        <button class="btn btn-primary fw-semibold mt-2 py-2 agregar" data-id="${id}">Agregar al carrito</button>
      </div>
    </div>
  `;
  lista.appendChild(col);
  });
}

document.addEventListener("click", e => {
  const target = e.target;

  const productCard = target.closest('.card');
  
  if (target.classList.contains("agregar")) {
    e.stopPropagation();
    
    const id = Number(target.dataset.id);
    const productoBase = productos[id - 1];
    if (!productoBase) return;
    
    const item = carrito.find(p => p.id === id);
    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ ...productoBase, id: id, cantidad: 1 });
    }
    
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
  } else if (productCard && !target.classList.contains('agregar')) {
    const id = productCard.dataset.id;
    if (id) {
      window.location.href = `details.html?id=${id}`; 
    }
  }
});


// LOGIN
const form = document.getElementById("loginForm");
const error = document.getElementById("loginError");

form.addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("clave").value.trim();

  if (!user || !pass) {
    error.textContent = "Debes ingresar usuario y contraseña.";
    return;
  }

  error.textContent = "";
  const modalElement = document.getElementById("loginModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  alert(`Bienvenido/a, ${user}`);
});


const contenedor = document.getElementById("carritoLista"); 

function mostrarCarrito() {
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;
  let html = `
    <table class="table table-dark table-striped text-center align-middle">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Unidad</th>
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
    <h4 class="text-end mt-3">$${total}</h4>
  `;

  contenedor.innerHTML = html;
}

document.getElementById("vaciar").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  location.reload();
});

mostrarCarrito();