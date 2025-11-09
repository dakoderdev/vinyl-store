const productos = [
  { nombre: "Brat", precio: 16500, img: "vinyl-brat.jpg" },
  { nombre: "The Life of a Showgirl", precio: 18000, img: "vinyl-showgirl.jpg" },
  { nombre: "Short & Sweet Deluxe", precio: 20000, img: "vinyl-shortsweetdeluxe.jpg" },
  { nombre: "AM", precio: 20100, img: "vinyl-am.jpg" },
  { nombre: "Future Nostalgia", precio: 17350, img: "vinyl-futurenostalgia.jpg" },
  { nombre: "Norman F*cking Rockwell", precio: 16000, img: "vinyl-nfr.jpg" },
  { nombre: "Come Over When You're Sober", precio: 16000, img: "vinyl-comesober.jpg" },
  { nombre: "1989", precio: 17000, img: "vinyl-1989.jpg" },
  { nombre: "Starboy", precio: 18250, img: "vinyl-starboy.jpg" },
];


const lista = document.getElementById("listaProductos");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((prod, index) => {
  const id = index + 1;
  const col = document.createElement("div");
  col.classList.add("col-md-4");
  col.innerHTML = `
    <div class="card h-100 bg-black text-light">
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
