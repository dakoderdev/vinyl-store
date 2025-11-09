// js/app.js

// Catálogo de vinilos
  const productos = [
  { id: 1, nombre: "Brat", precio: 16700, img: "public/vinyl-brat.jpg" },
  { id: 2, nombre: "The Life of a Showgirl", precio: 16700, img: "public/vinyl-showgirl.jpg" },
  { id: 3, nombre: "Short & Sweet Deluxe", precio: 16700, img: "public/vinyl-shortsweetdeluxe.jpg" },
];



const lista = document.getElementById("listaProductos");

// Recupero o creo carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const placeholderImg = "https://picsum.photos/1000/1000";

// Pintar productos en cards
productos.forEach(prod => {
  const col = document.createElement("div");
  col.classList.add("col-md-4");
  col.innerHTML = `
    <div class="card h-100 bg-black text-light">
      <img src="${prod.img || placeholderImg}" class="card-img-top producto-img" alt="${prod.nombre}">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-precio card-text">$${prod.precio}</p>
        </div>
        <button class="btn btn-primary fw-semibold mt-2 agregar" data-id="${prod.id}">Agregar al carrito</button>
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
