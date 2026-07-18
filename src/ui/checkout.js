import { obtenerCarrito, vaciarCarrito } from "../carrito.js";
import { productoPorId } from "../productos.js";
import { cerrarCarrito } from "./carrito-ui.js";
import { abrirSheet } from "./sheet.js";
import { mostrarToast } from "./toast.js";
import { armarMensajeWhatsapp, abrirWhatsapp } from "./whatsapp.js";

export function initWhatsappCheckout() {
  document.getElementById("whatsapp-checkout").addEventListener("click", () => {
    const carrito = obtenerCarrito();
    const entradas = Object.entries(carrito);

    if (entradas.length === 0) {
      mostrarToast("Tu bolsa está vacía. Agrega alguna prenda primero.");
      return;
    }

    let total = 0;
    const itemsHTML = entradas
      .map(([id, cantidad]) => {
        const p = productoPorId(id);
        const subtotal = p.precio * cantidad;
        total += subtotal;
        return `
          <div class="confirm-item">
            <div>
              <p class="confirm-item-name">${p.nombre} x${cantidad}</p>
              <p class="confirm-item-meta">Talla ${p.talla}</p>
            </div>
            <span class="confirm-item-subtotal">S/ ${subtotal}</span>
          </div>`;
      })
      .join("");

    const contenidoHTML = `
      ${itemsHTML}
      <div class="confirm-total-row"><span>Total</span><span>S/ ${total}</span></div>
    `;

    abrirSheet({
      titulo: "Confirma tu pedido",
      contenidoHTML,
      acciones: [
        { texto: "Cancelar", tipo: "secondary" },
        {
          texto: "Confirmar y enviar",
          tipo: "primary",
          onClick: () => {
            const mensaje = armarMensajeWhatsapp(entradas, productoPorId, total);
            abrirWhatsapp(mensaje);
            vaciarCarrito();
            cerrarCarrito();
          },
        },
      ],
    });
  });
}