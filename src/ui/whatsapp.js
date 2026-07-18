import { WHATSAPP_NUMERO, NOMBRE_TIENDA } from "../config.js";

export function armarMensajeWhatsapp(entradas, productoPorId, total) {
  const lineas = entradas.map(([id, cantidad]) => {
    const p = productoPorId(id);
    const subtotal = p.precio * cantidad;
    return `- ${p.nombre} (talla ${p.talla}) x${cantidad} - S/ ${subtotal}`;
  });

  return [
    `Hola ${NOMBRE_TIENDA}! Quiero comprar:`,
    ...lineas,
    ``,
    `Total: S/ ${total}`,
  ].join("\n");
}

export function abrirWhatsapp(mensaje) {
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  const nuevaVentana = window.open(url, "_blank");

  if (!nuevaVentana || nuevaVentana.closed) {
    window.location.href = url;
  }
}