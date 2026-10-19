# UBICAR ® — Red Internacional de Seguridad

Corporate website for **UBICAR ®**, a security company operating in Bolivia since 2002: satellite tracking, UBITRACK logistics, property monitoring and asset marking. Built with **vanilla HTML, CSS and JavaScript** — no frameworks, no build step, no UI libraries.

## Highlights

- **Long B2B landing + 5 detail pages** (Nosotros, Servicios, Productos, Sucursales, Contacto).
- **Modern design system**: brand palette (black + red `#D10B0B`), typography Manrope + Inter, fluid scale with `clamp()`.
- **Real content**: services, product list, 4 branches (Santa Cruz, Cochabamba, La Paz, Tarija) and official certifications (ATT, Policía Boliviana, Aduana Nacional).
- **Responsive** from 320px to 1440px.
- **Accessible (WCAG 2.1 AA)**: skip link, landmarks, visible focus, labeled form, `prefers-reduced-motion`.
- **SEO**: meta description, Open Graph, JSON-LD `Organization` with the 4 locations, favicon.
- **Performance**: WebP images, lazy loading.

## Stack

- HTML5
- CSS3 (custom properties, Grid, `clamp()`)
- Vanilla JS (accessible nav, scroll reveal, form validation)

## Structure

```
index.html                 # landing
styles.css                 # shared design system
main.js                    # shared interactions
favicon.svg
.nojekyll
routes/
  nosotros/index.html
  servicios/index.html
  productos/index.html
  sucursales/index.html
  contacto/index.html
img/                       # webp (used) + originals
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Live preview

<https://jordanroberto74.github.io/ubicar/>

## Notes

- The quote/contact form is **front-end only**: it validates fields and shows a success state; no backend.
- Content is the company's real information (services, branches, certifications).

## Contact

<info@ubicar.com.bo>
