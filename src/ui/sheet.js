const overlay = document.getElementById("sheet-overlay");
const sheetEl = document.getElementById("sheet");
const titleEl = document.getElementById("sheet-title");
const bodyEl = document.getElementById("sheet-body");
const actionsEl = document.getElementById("sheet-actions");

export function abrirSheet({ titulo, contenidoHTML, acciones }) {
  titleEl.textContent = titulo;
  bodyEl.innerHTML = contenidoHTML;

  actionsEl.innerHTML = "";
  acciones.forEach((accion) => {
    const btn = document.createElement("button");
    btn.textContent = accion.texto;
    btn.className =
      accion.tipo === "primary" ? "sheet-btn sheet-btn--primary" : "sheet-btn sheet-btn--secondary";
    btn.addEventListener("click", () => {
      accion.onClick?.();
      cerrarSheet();
    });
    actionsEl.appendChild(btn);
  });

  overlay.hidden = false;
  sheetEl.classList.add("is-open");
  sheetEl.setAttribute("aria-hidden", "false");
}

export function cerrarSheet() {
  overlay.hidden = true;
  sheetEl.classList.remove("is-open");
  sheetEl.setAttribute("aria-hidden", "true");
}

overlay.addEventListener("click", cerrarSheet);