# UBICAR ® — Red Internacional de Seguridad

Sitio corporativo de **UBICAR ®**, empresa de seguridad con operaciones en Bolivia desde 2002: rastreo satelital, seguimiento logístico UBITRACK, monitoreo de propiedades y respuesta física.

Construido con **HTML, CSS y JavaScript sin frameworks**, sin build step y sin dependencias de UI.

## Sistema visual

- **Paleta:** negro `#0a0a0b`, rojo `#e10600` (UI), rojo brillante `#ff3b30` sobre fondos oscuros y blanco.
- **Tipografía:** Archivo para títulos, IBM Plex Sans para texto e IBM Plex Mono para etiquetas técnicas.
- **Dirección:** “panel de control” — retícula, coordenadas, numeración y acentos rojos derivados del logo.
- **Navegación:** header y footer compartidos en las 6 páginas, con enlaces a Inicio, Nosotros, Servicios, Productos, Sucursales y Contacto.
- **Responsive:** desde 320 px, con menú móvil accesible y foco atrapado mientras está abierto.

## Páginas

```text
index.html                 # Home
styles.css                 # Sistema visual compartido
main.js                    # Navegación, reveal y formularios
favicon.svg / favicon.ico
routes/
  nosotros/index.html
  servicios/index.html
  productos/index.html
  sucursales/index.html
  contacto/index.html
img/
  originals/               # Originales de las fotos seleccionadas
  legacy/                  # Material descartado, conservado como referencia
  future/                  # Material reservado para una fase posterior
```

## Páginas internas

Las cinco páginas internas comparten el mismo ritmo visual: hero oscuro con panel contextual, contenido blanco, sección en papel y cierre oscuro con llamada a la acción.

- **Nosotros:** ficha corporativa, datos de operación, cifras y compromisos de servicio.
- **Servicios:** cuatro tarjetas alineadas al home (rastreo, UBITRACK, propiedades y respuesta física) y bloque complementario de marcado de bienes.
- **Productos:** asegurado de partes y piezas, proceso de instalación y catálogo de 21 piezas.
- **Sucursales:** directorio de sedes con enlaces accesibles a Google Maps.
- **Contacto:** panel de conversión del home con datos de contacto y formulario.

## Imágenes

El sitio usa fotografías optimizadas en WebP, con variantes para 1x/2x:

- `hero-central-monitoreo-1200.webp` / `-800.webp`
- `servicio-rastreo-satelital-720.webp` / `-360.webp`
- `servicio-logistica-flotas-720.webp` / `-360.webp`
- `servicio-monitoreo-propiedades-720.webp` / `-360.webp`
- `servicio-respuesta-fisica-720.webp` / `-360.webp`
- `plataforma-rastreo-vehiculo.webp` (sección Plataforma, junto a una vista de la central)
- `productos-partes-piezas-1200.webp` / `-600.webp` (hero de Productos)

Los originales están en `img/originals/`. Las imágenes con texto generado ilegible, interfaces inventadas o mapas de baja resolución se movieron a `img/legacy/` y no se publican.

## Formularios

Los formularios son **solo frontend**:

1. El formulario de Contacto valida nombre, teléfono, correo, ciudad, servicio y consentimiento; el del home mantiene nombre, teléfono, servicio y consentimiento.
2. Abren WhatsApp (`+591 77319046`) con el mensaje precargado.
3. Si el navegador bloquea la ventana, ofrecen un enlace alternativo y un fallback por correo a `info@ubicar.com.bo`.

No hay API ni backend. No se muestra un mensaje falso de “solicitud enviada”.

## Datos de contacto

- **Central Santa Cruz:** Av. Guapay # 2460, esquina Av. Pauserna, entre 2do y 3er anillo.
- **Tel/Fax:** 347-5460
- **WhatsApp:** 77319046
- **Correo:** info@ubicar.com.bo
- **Cobertura:** Santa Cruz (central), Cochabamba, La Paz y Tarija (dealer)

## Ejecutar localmente

Abre `index.html` directamente o sirve la carpeta:

```bash
python -m http.server 8080
```

Luego visita <http://localhost:8080>.

## Vista previa

<https://jordanroberto74.github.io/ubicar/>
