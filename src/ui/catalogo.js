import { productos, categorias, nombresCategoria } from "../productos.js";
import { agregarAlCarrito, obtenerCarrito } from "../carrito.js";
import { mostrarToast } from "./toast.js";
import { attachCardSliders } from "./card-slider.js";

const catalogEl = document.getElementById("catalog");
const tabsEl = document.getElementById("tabs");
const emptyStateEl = document.getElementById("empty-state");

let categoriaActiva = "todo";

export function renderTabs() {
  tabsEl.innerHTML = categorias
    .map(
      (cat) => `
      <button class="tab ${cat === categoriaActiva ? "is-active" : ""}" data-cat="${cat}">
        ${nombresCategoria[cat] || cat}
      </button>`
    )
    .join("");

  tabsEl.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      categoriaActiva = btn.dataset.cat;
      renderTabs();
      renderCatalogo();
    });
  });
}

export function renderCatalogo() {
  const lista =
    categoriaActiva === "todo"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  emptyStateEl.hidden = lista.length !== 0;

  catalogEl.innerHTML = lista
    .map((p) => {
      const enCarrito = obtenerCarrito()[p.id] || 0;
      const agotado = enCarrito >= p.stock;
      return `
        <article class="card" data-id="${p.id}">
          <div class="card-media">
            <div class="card-slides">
              ${p.imagenes
                .map(
                  (img, i) =>
                    `<img src="${img}" alt="${p.nombre}" loading="lazy" class="card-slide ${i === 0 ? "is-active" : ""}" />`
                )
                .join("")}
            </div>
            <span class="price-tag">S/ ${p.precio}</span>
            ${
              p.imagenes.length > 1
                ? `
              <button class="card-nav card-nav--prev" data-id="${p.id}" aria-label="Imagen anterior">‹</button>
              <button class="card-nav card-nav--next" data-id="${p.id}" aria-label="Imagen siguiente">›</button>
              <div class="card-dots">
                ${p.imagenes.map((_, i) => `<span class="card-dot ${i === 0 ? "is-active" : ""}"></span>`).join("")}
              </div>`
                : ""
            }
          </div>
          <div class="card-body">
            <h3 class="card-name">${p.nombre}</h3>
            <p class="card-meta">Talla ${p.talla}</p>
            <button class="add-btn" data-id="${p.id}" ${agotado ? "disabled" : ""}>
              ${agotado ? "Máximo agregado" : "Agregar a la bolsa"}
            </button>
          </div>
        </article>`;
    })
    .join("");

  attachCardSliders(catalogEl);

  catalogEl.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const producto = productos.find((p) => p.id === btn.dataset.id);
      agregarAlCarrito(btn.dataset.id);
      mostrarToast(`${producto.nombre} agregado a la bolsa ✓`, { duracion: 2000 });
    });
  });
}