const stackEl = document.getElementById("toast-stack");

export function mostrarToast(mensaje, { duracion = 3000 } = {}) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  stackEl.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duracion);
}