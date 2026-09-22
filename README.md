# 💜 Feliz Cumpleaños — Sitio estático para mi novia

Proyecto web estático (HTML + CSS + JS puro, sin dependencias) con animaciones
fantásticas y flores **sin amarillas** (rosa, rojo, morado y blanco).

## Cómo verlo

Doble clic en `index.html`, o con un servidor local:

```bash
cd "cumpleanos novia"
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Qué incluye

- 🎬 **Recuerdos estilo Studio Ghibli**: Copacabana, La Paz, cine, trampolines, karaoke y "tú y yo" (SVG animados)
- 💌 Carta personal con el mensaje
- 🌸 Pétalos de flores cayendo (canvas) — rosa/rojo/morado/blanco
- ✨ Estrellas destellantes y corazones flotantes
- 💐 Jardín que "brotan" al hacer scroll
- 🎂 Pastel interactivo: apaga las 5 velas y lanza confeti
- 🎈 Confeti en botón y clics
- 📱 Responsive y con `prefers-reduced-motion`

## Estructura

- `index.html` — escenas y contenido
- `css/styles.css` — estilos + animaciones Ghibli
- `js/script.js` — pétalos, confeti, interacciones

## Personaliza

- Cambia "Mi Amor" y los textos en `index.html`
- Añade más escenas copiando un `<figure class="scene">`
- Paleta en `css/styles.css` (`--pink`, `--purple`)
