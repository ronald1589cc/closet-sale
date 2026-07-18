# El Ropero — Closet Sale

Web básica de catálogo con carrito y checkout por WhatsApp. Vite + JavaScript vanilla, sin backend ni base de datos.

## Requisitos

- Node.js

## Cómo agregar / editar / quitar prendas

Todo el catálogo vive en **`src/productos.js`**. Cada prenda es un bloque así:

```js
{
  id: "blusa-floral-01",       // único, sin espacios
  nombre: "Blusa floral manga larga",
  precio: 35,
  talla: "S",
  categoria: "blusas",          // debe coincidir con una categoría existente
  imagen: "/images/blusa-floral-01.jpg",
}
```

Para **agregar** una prenda: copia un bloque, cambia los datos, listo.
Para **quitar** una prenda: borra su bloque.
Para **agregar una categoría nueva**: solo úsala en el campo `categoria` de una prenda — aparece sola como tab. Si quieres un nombre bonito en el tab (ej. "Carteras" en vez de "carteras"), agrégalo en el objeto `nombresCategoria` al final del archivo.

## Cómo subir fotos

1. Comprime la foto (recomendado: [squoosh.app](https://squoosh.app), formato `.webp` o `.jpg`, apunta a 150–300 KB).
2. Colócala en `public/images/`.
3. Referencia el nombre de archivo en el campo `imagen` del producto (ej. `/images/mi-foto.jpg`).

## Configurar el número de WhatsApp

Edita **`src/config.js`**:

```js
export const WHATSAPP_NUMERO = "51987654321"; // código de país + número, sin + ni espacios
```

## Estructura del proyecto

```
closet-sale/
├── index.html          ← estructura de la página
├── src/
│   ├── main.js          ← lógica: render de catálogo, tabs, carrito, WhatsApp
│   ├── productos.js      ← 👉 aquí editas el catálogo
│   ├── carrito.js        ← estado del carrito (localStorage)
│   ├── config.js         ← 👉 aquí pones el número de WhatsApp
│   └── style.css         ← estilos
└── public/images/       ← 👉 aquí van las fotos de las prendas
```
