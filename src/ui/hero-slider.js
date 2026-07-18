export function initHeroSlider() {
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDotsEl = document.getElementById("hero-dots");
  if (heroSlides.length === 0) return;

  let heroActual = 0;
  let heroTimer = null;

  function irASlide(indice) {
    heroSlides[heroActual].classList.remove("is-active");
    heroDotsEl.children[heroActual]?.classList.remove("is-active");
    heroActual = indice;
    heroSlides[heroActual].classList.add("is-active");
    heroDotsEl.children[heroActual]?.classList.add("is-active");
  }

  function siguienteSlide() {
    irASlide((heroActual + 1) % heroSlides.length);
  }

  function reiniciarAutoplay() {
    clearInterval(heroTimer);
    heroTimer = setInterval(siguienteSlide, 7000);
  }

  heroDotsEl.innerHTML = Array.from(heroSlides)
    .map((_, i) => `<button aria-label="Ir a la imagen ${i + 1}" class="${i === 0 ? "is-active" : ""}"></button>`)
    .join("");

  Array.from(heroDotsEl.children).forEach((dot, i) => {
    dot.addEventListener("click", () => {
      irASlide(i);
      reiniciarAutoplay();
    });
  });

  reiniciarAutoplay();
}