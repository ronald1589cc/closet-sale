export function crearPaginador({ contenedorEl, listaEl, porPagina, onRenderPagina }) {
  let paginaActual = 1;
  let ultimaLista = [];

  function pintar() {
    const totalPaginas = Math.max(1, Math.ceil(ultimaLista.length / porPagina));
    paginaActual = Math.min(paginaActual, totalPaginas);

    const inicio = (paginaActual - 1) * porPagina;
    const pagina = ultimaLista.slice(inicio, inicio + porPagina);

    onRenderPagina(pagina);
    dibujarBotones(totalPaginas);
  }

  function construirRangoPaginas(totalPaginas) {
    const paginas = [];
    const alrededor = 1; // cuántas páginas mostrar a cada lado de la actual

    for (let i = 1; i <= totalPaginas; i++) {
      const esBorde = i === 1 || i === totalPaginas;
      const esCercana = i >= paginaActual - alrededor && i <= paginaActual + alrededor;

      if (esBorde || esCercana) {
        paginas.push(i);
      } else if (paginas[paginas.length - 1] !== "...") {
        paginas.push("...");
      }
    }
    return paginas;
  }

  function dibujarBotones(totalPaginas) {
    if (totalPaginas <= 1) {
      contenedorEl.innerHTML = "";
      return;
    }

    let botones = `<button class="page-btn" data-page="${paginaActual - 1}" ${paginaActual === 1 ? "disabled" : ""}>‹</button>`;

    construirRangoPaginas(totalPaginas).forEach((p) => {
      if (p === "...") {
        botones += `<span class="page-ellipsis">…</span>`;
      } else {
        botones += `<button class="page-btn ${p === paginaActual ? "is-active" : ""}" data-page="${p}">${p}</button>`;
      }
    });

    botones += `<button class="page-btn" data-page="${paginaActual + 1}" ${paginaActual === totalPaginas ? "disabled" : ""}>›</button>`;

    contenedorEl.innerHTML = botones;

    contenedorEl.querySelectorAll(".page-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        paginaActual = Number(btn.dataset.page);
        pintar();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  return {
    render(items) {
      ultimaLista = items;
      pintar();
    },
    reiniciar() {
      paginaActual = 1;
    },
  };
}