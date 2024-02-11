//Variables
const productGrid = document.querySelector(".product__gri");
const productContent = document.querySelector(".carrito__product");
const carritoCont = document.querySelector(".carrito");
const vacio = document.querySelector(".empty");
const totalPrecio = document.getElementById("numTotal");
const contentTotal = document.querySelector(".total");

let carrito = [];

//Events
productGrid.addEventListener("click", agregarProducto);
carritoCont.addEventListener("click", borrarProduct);
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("hamburguesas")) || [];

  crearAgregarHTML();
});

//Funciones

function empty() {
  if (carrito.length > 0) {
    vacio.classList.add("noview");
    contentTotal.classList.add("view");
  } else {
    vacio.classList.remove("noview");
    contentTotal.classList.remove("view");
  }
}

function borrarProduct(e) {
  e.preventDefault();

  if (e.target.classList.contains("btn-delete")) {
    const dataId = e.target.getAttribute("data-id");

    const existe = carrito.some((dat) => dat.cantidad > 1 && dat.id === dataId);
    if (existe) {
      const cant = carrito.map((ct) => {
        if (ct.id === dataId) {
          ct.cantidad--;
        }
        return ct;
      });
      carrito = [...cant];
    } else {
      carrito = carrito.filter((dt) => dt.id !== dataId);
    }
    empty();
    crearAgregarHTML();
  }
}

function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("card__agregar")) {
    const card = e.target.parentElement.parentElement;
    agarrarCard(card);
  }
}

function agarrarCard(card) {
  const datos = {
    titulo: card.querySelector("h3").textContent,
    precio: card.querySelector("p").textContent,
    cantidad: 1,
    id: card.querySelector("a").getAttribute("data-id"),
  };

  const existe = carrito.some((cant) => datos.id === cant.id);
  if (existe) {
    const cantidad = carrito.map((canti) => {
      if (datos.id === canti.id) {
        canti.cantidad++;
        return;
      } else {
        return;
      }
    });
  } else {
    carrito = [...carrito, datos];
  }

  crearAgregarHTML();
}

function crearAgregarHTML() {
  clearRepeat();
  let total = 0;

  carrito.forEach((car) => {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `
      <span>${car.cantidad}</span>
      <span>${car.titulo}</span>
      <span>${car.precio}</span>
      <a>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon-close btn-delete"
          data-id="${car.id}"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </a>
    `;
    productContent.appendChild(row);
    total += parseInt(car.cantidad * car.precio.replace("S/", ""));
    totalPrecio.textContent = `S/ ${total}`;
  });
  sicronizar();
  empty();
}

function sicronizar() {
  localStorage.setItem("hamburguesas", JSON.stringify(carrito));
}

function clearRepeat() {
  productContent.textContent = "";
}
