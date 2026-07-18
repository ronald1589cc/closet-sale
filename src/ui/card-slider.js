let cardSliderTimers = [];

function limpiarCardSliderTimers() {
  cardSliderTimers.forEach(clearInterval);
  cardSliderTimers = [];
}

export function attachCardSliders(catalogEl) {
  limpiarCardSliderTimers();

  catalogEl.querySelectorAll(".card-media").forEach((media) => {
    const slides = media.querySelectorAll(".card-slide");
    const dots = media.querySelectorAll(".card-dot");
    if (slides.length <= 1) return;

    let indice = 0;
    let timer = null;

    function irA(nuevo) {
      slides[indice].classList.remove("is-active");
      dots[indice]?.classList.remove("is-active");
      indice = (nuevo + slides.length) % slides.length;
      slides[indice].classList.add("is-active");
      dots[indice]?.classList.add("is-active");
    }

    function reiniciarAuto() {
      clearInterval(timer);
      timer = setInterval(() => irA(indice + 1), 3500);
      cardSliderTimers.push(timer);
    }

    media.querySelector(".card-nav--prev")?.addEventListener("click", (e) => {
      e.stopPropagation();
      irA(indice - 1);
      reiniciarAuto();
    });
    media.querySelector(".card-nav--next")?.addEventListener("click", (e) => {
      e.stopPropagation();
      irA(indice + 1);
      reiniciarAuto();
    });

    media.addEventListener("mouseenter", () => clearInterval(timer));
    media.addEventListener("mouseleave", reiniciarAuto);

    reiniciarAuto();
  });
}