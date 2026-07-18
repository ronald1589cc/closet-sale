import "./style.css";
import { onCarritoChange } from "./carrito.js";
import { renderTabs, renderCatalogo } from "./ui/catalogo.js";
import { renderCarrito } from "./ui/carrito-ui.js";
import { initHeroSlider } from "./ui/hero-slider.js";
import { initWhatsappCheckout } from "./ui/checkout.js";

onCarritoChange(renderCarrito);
onCarritoChange(renderCatalogo);

renderTabs();
renderCatalogo();
renderCarrito();
initHeroSlider();
initWhatsappCheckout();