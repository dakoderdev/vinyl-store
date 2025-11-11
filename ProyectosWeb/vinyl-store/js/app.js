// Cosas de localStorage
const USER_STORAGE_KEY = "loggedInUser";
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Lista de productos
const lista = document.getElementById("listaProductos");

function renderProductos() {
  if (!lista) return;
  productos.forEach((prod, index) => {
    const id = index + 1;
    const col = document.createElement("div");
    col.classList.add("col-md-4");
    col.innerHTML = `
      <div class="card h-100 bg-black text-light" data-id="${id}">
        <img src="public/${prod.img}" class="card-img-top producto-img" alt="${prod.nombre}">
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
renderProductos();


// Click de las card
function clickCard(e) {
  const target = e.target;
  const productCard = target.closest(".card");
  if (target.classList.contains("agregar")) {
    e.stopPropagation();
    agregarAlCarrito(Number(target.dataset.id));
  } else if (productCard && !target.classList.contains("agregar")) {
    abrirDetalle(productCard.dataset.id);
  }
}
document.addEventListener("click", clickCard);

function agregarAlCarrito(id) {
  const productoBase = productos[id - 1];
  if (!productoBase) return;
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...productoBase, id, cantidad: 1 });
  }
  mostrarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  animarCarrito();
}

function abrirDetalle(id) {
  if (!id) return;
  window.location.href = `details.html?id=${id}`;
}

// Login
const form = document.getElementById("loginForm");
const error = document.getElementById("loginError");
const loginButton = document.getElementById("loginButton");

function loginSubmit(e) {
  e.preventDefault();
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("clave").value.trim();
  if (!user || !pass) {
    error.textContent = "Debes ingresar usuario y contraseña.";
    return;
  }
  localStorage.setItem(USER_STORAGE_KEY, user);
  error.textContent = "";
  const modalElement = document.getElementById("loginModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  loginButton.innerHTML = user;
}
form.addEventListener("submit", loginSubmit);

function cambiarNombreLoginButton() {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUser && loginButton) loginButton.innerHTML = storedUser;
}
cambiarNombreLoginButton();


// Carrito
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
mostrarCarrito();


const carritoButton = document.getElementById("carritoButton");

function animarCarrito() {
  carritoButton.classList.add("carrito-jump");
  setTimeout(() => carritoButton.classList.remove("carrito-jump"), 600);
}


const vaciarButton = document.getElementById("vaciar");

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload();
}
vaciarButton.addEventListener("click", vaciarCarrito);
