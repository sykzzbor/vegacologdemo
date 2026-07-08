# Vegacolor Pinturerías — Tienda online

Ecommerce demo para Vegacolor Pinturerías: catálogo con filtros y buscador,
carrito con persistencia y checkout por WhatsApp. Hecho con React + Vite.

## Correr localmente

```bash
npm install
npm run dev
```

La web queda disponible en **http://localhost:5173**

## Datos a personalizar

Todo lo editable está en [`src/config.js`](src/config.js):

- `WHATSAPP_NUMBER` — número real de WhatsApp (formato `549XXXXXXXXXX`, sin `+`)
- `BRANCHES` — direcciones y horarios de las sucursales
- `INSTAGRAM_URL` — perfil de Instagram

Los productos y categorías viven en [`src/data/products.js`](src/data/products.js).
Cada producto tiene nombre, categoría, descripción, precio (o `null` para
"Consultar precio") y el color de su ficha visual.

Para usar el logo real: en `src/components/Header.jsx` y `Footer.jsx`,
reemplazar el bloque `.brand-mark` por `<img src="/logo.svg" alt="Vegacolor" />`
(colocar el archivo en `public/`).

## Build de producción

```bash
npm run build    # genera dist/
npm run preview  # sirve el build localmente
```

---
Desarrollado por Vantix.
