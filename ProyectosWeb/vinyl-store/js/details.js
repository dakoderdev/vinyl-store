const contenedorDetalle = document.getElementById("productoDetalle");

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

// 2. Function to render the product details
function renderProductDetails() {
  const productId = getProductIdFromUrl();
  // Find the product (IDs start at 1, so index is ID - 1)
  const product = productos[productId - 1];

  // Clear loading state
  contenedorDetalle.innerHTML = ''; 

  if (!product) {
    contenedorDetalle.innerHTML = `
      <div class="col-12 text-center my-5">
        <h3 class="text-danger">❌ Producto no encontrado.</h3>
        <p>El ID proporcionado en la URL no corresponde a ningún producto.</p>
      </div>
    `;
    return;
  }

  const detailHTML = `
    <div class="col-md-6 mb-4 mb-md-0">
      <img src="public/${product.img}" class="img-fluid rounded shadow-lg" alt="${product.nombre}" style="max-height: 500px; object-fit: cover;">
    </div>
    <div class="col-md-6">
      <h1 class="display-4 fw-bold">${product.nombre}</h1>
      <h2 class="text-light fs-3 mb-4">${product.artista}</h2>
      
      <p class="lead">${product.descripcion}</p>
      
      <hr class="border">
      
      <div class="d-flex justify-content-end align-items-center mb-4">
        <h3 class="display-6 m-0">$${product.precio.toLocaleString('es-AR')}</h3>
      </div>

      <button class="btn btn-primary btn-lg w-100 fw-semibold agregar" data-id="${productId}">
        Agregar al Carrito
      </button>
    </div>
  `;
  
  contenedorDetalle.innerHTML = detailHTML;
  document.title = `${product.nombre} | Vinimusic`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
    if (typeof mostrarCarrito === 'function') {
        mostrarCarrito();
    }
});
