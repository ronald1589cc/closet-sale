const STORAGE_KEY = "el-ropero-carrito";

function leerCarrito() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

// carrito: { [productoId]: cantidad }
let carrito = leerCarrito();
const listeners = [];

export function onCarritoChange(fn) {
  listeners.push(fn);
}

function notificar() {
  guardarCarrito(carrito);
  listeners.forEach((fn) => fn(carrito));
}

export function agregarAlCarrito(id) {
  carrito[id] = (carrito[id] || 0) + 1;
  notificar();
}

export function quitarUnaUnidad(id) {
  if (!carrito[id]) return;
  carrito[id] -= 1;
  if (carrito[id] <= 0) delete carrito[id];
  notificar();
}

export function eliminarDelCarrito(id) {
  delete carrito[id];
  notificar();
}

export function vaciarCarrito() {
  carrito = {};
  notificar();
}

export function obtenerCarrito() {
  return carrito;
}

export function totalItems() {
  return Object.values(carrito).reduce((a, b) => a + b, 0);
}
