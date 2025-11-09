// js/app.js

// Catálogo de vinilos
  const productos = [
  { id: 1, nombre: "", precio: 16700, img: "img/" },
  { id: 2, nombre: "", precio: 12500, img: "img/" },
  { id: 3, nombre: "", precio: 18000, img: "img/" },
  { id: 4, nombre: "", precio: 15800, img: "img/" },
  { id: 5, nombre: "", precio: 19800, img: "img/" },
  { id: 6, nombre: "", precio: 11400, img: "img/" },
  { id: 7, nombre: "", precio: 16300, img: "img/" },
  { id: 8, nombre: "", precio: 17000, img: "img/" },
  { id: 9, nombre: "", precio: 13000, img: "img/" },
  { id: 10, nombre: "", precio: 15000, img: "img/" },
];



const lista = document.getElementById("listaProductos");

// Recupero o creo carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Pintar productos en cards
productos.forEach(prod => {
  const col = document.createElement("div");
  col.classList.add("col-md-4");
  col.innerHTML = `
    <div class="card h-100 bg-black text-light border border-warning">
      <img src="${prod.img}" class="card-img-top producto-img" alt="${prod.nombre}">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title text-warning">${prod.nombre}</h5>
          <p class="card-text">$${prod.precio}</p>
        </div>
        <button class="btn btn-warning fw-semibold mt-2 agregar" data-id="${prod.id}">Agregar al carrito</button>
      </div>
    </div>
  `;
  lista.appendChild(col);
});

// Delegación de evento para botones "Agregar al carrito"
document.addEventListener("click", e => {
  if (e.target.classList.contains("agregar")) {
    const id = Number(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);

    const item = carrito.find(p => p.id === id);
    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`🎵 ${producto.nombre} fue agregado al carrito`);
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
