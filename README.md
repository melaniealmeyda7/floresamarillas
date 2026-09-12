# Amarillo Miel · Landing Page de Talleres de Flores Amarillas & Planes Chill 🌻✨

Una landing page de alta conversión, diseñada con una estética *cute*, paleta de colores pasteles cálidos y enfoque directo en la generación de ventas de talleres de tejido (crochet), planes de desconexión y catálogo de regalos.

---

## 🎨 Características Principales

1. **Estética Cute & Colores Pasteles**:
   - Paleta suave: Amarillo mantequilla (`#FEF08A`), Crema vainilla (`#FFFDF9`), Rosa blush (`#FCE7F3`) y Verde salvia (`#DCFCE7`).
   - Tipografía amigable (*Outfit*, *Quicksand* y *Playfair Display*).
   - Efectos estilo polaroid con washi-tape y animaciones flotantes de margaritas y girasoles.

2. **Diseñado para Generar Ventas ("Modo Ventas")**:
   - Barra de anuncios superior con código de descuento (`AMIGUIS10`) y cupos limitados.
   - Contador regresivo en tiempo real para generar urgencia.
   - **Plan Amiguis**: Descuento por volumen para 2 personas (incentiva la compra compartida).
   - Prueba social: Calificación 4.9/5 con testimonios reales y fotos estilo polaroid.
   - **Garantía Cero Frustración**: Elimina el miedo de las principiantes que nunca han tejido.

3. **Sección de Eventos con Costos**:
   - Desglose transparente de 3 modalidades:
     - **Pase Individual Chill**: S/. 135 PEN (~$36 USD)
     - **Plan Amiguis (2 Personas)**: S/. 230 PEN (~$62 USD) con 15% OFF
     - **Pase VIP Bloom**: S/. 300 PEN (~$81 USD) con ramo gigante de regalo
   - Calendario con fechas, horarios, ubicaciones y contador de cupos restantes.

4. **Sección de Regalos & Kits DIY**:
   - Ramo Eterno "Sol de Primavera" listo para entregar.
   - Kit DIY "Teje en Casa" con hilados, aguja y videotutorial.
   - Gift Card para regalar la experiencia con sobre lacrado.
   - Macetita decorativa "Girasol Sonriente".

5. **Checkout Directo a WhatsApp**:
   - Modal interactivo de reserva que calcula el total en tiempo real.
   - Soporta dedicatorias para regalos.
   - Genera un mensaje estructurado y listo para enviar al WhatsApp del negocio en un clic.

6. **Detalles Chill & Extras**:
   - Mini reproductor de música lo-fi relajante ambient en la esquina inferior derecha.
   - Lluvia de confeti festivo con tonos amarillos y pasteles al interactuar.
   - Preguntas frecuentes (FAQ) en acordeón interactivo.
   - Barra flotante de compra rápida en versión móvil.

---

## 🚀 Cómo Visualizar la Landing Page

### Opción 1: Abrir directamente en el navegador
Puedes abrir el archivo `index.html` con cualquier navegador:
```bash
open /Users/melaniealmeyda/.gemini/antigravity/scratch/talleres-flores-amarillas/index.html
```

### Opción 2: Iniciar un servidor local
```bash
cd /Users/melaniealmeyda/.gemini/antigravity/scratch/talleres-flores-amarillas
python3 -m http.server 8080
```
Luego abre `http://localhost:8080` en tu navegador.

---

## ⚙️ Personalización Rápida

Para cambiar el número de WhatsApp receptor y la moneda, edita el objeto `CONFIG` al inicio de `js/app.js`:

```javascript
const CONFIG = {
  whatsappNumber: "51987654321", // Reemplaza con tu número (con código de país sin +)
  businessName: "Amarillo Miel · Flores Amarillas Club",
  currencySymbol: "S/.", // o "$", "€", "MXN"
  usdRate: 0.27
};
```

Para actualizar los eventos, fechas o costos, modifica el array `EVENTS` en el mismo archivo `js/app.js`.
