import {
  agregarAlCarrito,
  quitarUnaUnidad,
  eliminarDelCarrito,
  obtenerCarrito,
  totalItems,
  vaciarCarrito,
} from "../carrito.js";
import { productoPorId } from "../productos.js";

const cartCountEl = document.getElementById("cart-count");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");

export function renderCarrito() {
  const carrito = obtenerCarrito();
  const entradas = Object.entries(carrito);

  cartCountEl.textContent = totalItems();

  if (entradas.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Tu bolsa está vacía todavía.</p>`;
    cartTotalEl.textContent = "S/ 0";
    return;
  }

  let total = 0;

  cartItemsEl.innerHTML = entradas
    .map(([id, cantidad]) => {
      const p = productoPorId(id);
      if (!p) return "";
      const subtotal = p.precio * cantidad;
      total += subtotal;
      const maximo = cantidad >= p.stock;
      return `
        <div class="cart-item" data-id="${id}">
          <img src="${p.imagenes[0]}" alt="${p.nombre}" />
          <div class="cart-item-info">
            <p class="cart-item-name">${p.nombre}</p>
            <p class="cart-item-meta">Talla ${p.talla} · S/ ${p.precio}</p>
            <div class="qty-control">
              <button class="qty-btn" data-action="menos" data-id="${id}">−</button>
              <span>${cantidad}</span>
              <button class="qty-btn" data-action="mas" data-id="${id}" ${maximo ? "disabled" : ""}>+</button>
              <button class="remove-btn" data-id="${id}">Quitar</button>
            </div>
          </div>
          <span class="cart-item-subtotal">S/ ${subtotal}</span>
        </div>`;
    })
    .join("");

  cartTotalEl.textContent = `S/ ${total}`;

  cartItemsEl.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.action === "mas") {
        const producto = productoPorId(btn.dataset.id);
        const enCarrito = obtenerCarrito()[btn.dataset.id] || 0;
        if (enCarrito >= producto.stock) return; // ya llegó al máximo, no deja sumar
        agregarAlCarrito(btn.dataset.id);
      } else {
        quitarUnaUnidad(btn.dataset.id);
      }
    });
  });

  cartItemsEl.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => eliminarDelCarrito(btn.dataset.id));
  });
}

export function abrirCarrito() {
  cartDrawer.classList.add("is-open");
  overlay.hidden = false;
  cartDrawer.setAttribute("aria-hidden", "false");
}

export function cerrarCarrito() {
  cartDrawer.classList.remove("is-open");
  overlay.hidden = true;
  cartDrawer.setAttribute("aria-hidden", "true");
}

document.getElementById("cart-toggle").addEventListener("click", abrirCarrito);
document.getElementById("cart-close").addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);
document.getElementById("cart-clear").addEventListener("click", () => {
  if (obtenerCarrito() && Object.keys(obtenerCarrito()).length > 0) {
    vaciarCarrito();
  }
});