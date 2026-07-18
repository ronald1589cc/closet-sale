// ─────────────────────────────────────────────────────────
// CATÁLOGO DE PRODUCTOS
// Para agregar una prenda nueva, copia un bloque { ... } y
// cambia los datos. La imagen debe estar en /public/images/
// ─────────────────────────────────────────────────────────

import { blusas } from "./Products/blusas.js";
import { pantalones } from "./Products/pantalones.js";
import { calzados } from "./Products/calzados.js";
import { accesorios } from "./Products/accesorios.js";
import { vestidos } from "./Products/vestidos.js";
import { tops } from "./Products/tops.js";
import { shorts } from "./Products/shorts.js";
import { faldas } from "./Products/faldas.js";
import { casacas } from "./Products/casacas.js";
import { suplex } from "./Products/suplex.js";

export const productos = [
  ...blusas,
  ...pantalones,
  ...calzados,
  ...accesorios,
  ...vestidos,
  ...tops,
  ...shorts,
  ...faldas,
  ...casacas,
  ...suplex,
];

// Categorías únicas, en el orden en que aparecen arriba,
// más "todo" al inicio.
export const categorias = [
  "todo",
  ...[...new Set(productos.map((p) => p.categoria))],
];

// Nombres bonitos para mostrar en los tabs (opcional).
export const nombresCategoria = {
  todo: "Todo",
  blusas: "Blusas",
  pantalones: "Pantalones",
  calzado: "Calzado",
  accesorios: "Accesorios",
};

export function productoPorId(id) {
  return productos.find((p) => p.id === id);
}
