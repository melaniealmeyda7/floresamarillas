/**
 * Amarillo Miel · Club de Tejido & Flores Amarillas
 * Lógica interactiva: Checkout WhatsApp, Modal de Reservas, Reproductor Lo-Fi, Confeti y Filtros
 */

// Configuración de contacto (Personalizable para el negocio)
const CONFIG = {
  whatsappNumber: "51987654321", // Cambiar por el número del organizador (con código de país)
  businessName: "Amarillo Miel · Flores Amarillas Club",
  currencySymbol: "S/.", // o "$", configurable
  usdRate: 0.27
};

// Datos de eventos con costos e imágenes ilustrativas
const EVENTS = [
  {
    id: "evt-01",
    title: "Tarde Chill de Girasoles & Lattes",
    date: "Sábado 21 de Septiembre",
    time: "3:30 PM - 6:30 PM",
    location: "Café Botánico (Miraflores)",
    spotsTotal: 12,
    spotsLeft: 3,
    badge: "🔥 ¡Solo 3 cupos!",
    flowerType: "Girasol & Margarita Amarilla",
    image: "assets/taller-01-girasol.jpg",
    includes: ["Kit completo de hilos & aguja ergonómica", "Bebida a elección (Matcha o Latte)", "Postre artesanal", "Tote Bag bordada de regalo"],
    prices: {
      individual: 135,
      amiguis: 230,
      vip: 300
    }
  },
  {
    id: "evt-02",
    title: "Sunset & Crochet: Ramillete de Margaritas",
    date: "Domingo 22 de Septiembre",
    time: "4:00 PM - 7:00 PM",
    location: "Jardín Secreto (San Isidro)",
    spotsTotal: 14,
    spotsLeft: 4,
    badge: "✨ Edición Especial Primavera",
    flowerType: "Ramillete 3 Margaritas Amarillas",
    image: "assets/taller-02-margaritas.jpg",
    includes: ["Kit de hilados premium de algodón", "Iced Matcha Latte o Mocktail de frutos amarillos", "Galletas de mantequilla y miel", "Guía paso a paso ilustrada"],
    prices: {
      individual: 135,
      amiguis: 230,
      vip: 300
    }
  },
  {
    id: "evt-03",
    title: "Taller Chill & Brunch de Flores Amarillas",
    date: "Sábado 28 de Septiembre",
    time: "10:30 AM - 1:30 PM",
    location: "Green Atelier & Café (Barranco)",
    spotsTotal: 10,
    spotsLeft: 2,
    badge: "⚡ Últimos 2 cupos",
    flowerType: "Tulipán Amarillo & Margarita",
    image: "assets/taller-03-tulipanes.jpg",
    includes: ["Kit completo con caja de madera", "Brunch chill: Toast de aguacate + Café/Té", "Mini ramo terminado extra", "Acceso a comunidad VIP de WhatsApp"],
    prices: {
      individual: 145,
      amiguis: 250,
      vip: 320
    }
  },
  {
    id: "evt-04",
    title: "Taller Online en Vivo + Kit a Domicilio",
    date: "Domingo 29 de Septiembre",
    time: "4:00 PM - 6:30 PM",
    location: "Transmisión Zoom HD + Envíos a todo el país",
    spotsTotal: 25,
    spotsLeft: 7,
    badge: "📦 Envío Gratis a Domicilio",
    flowerType: "Girasol Eterno en Macetita",
    image: "assets/taller-04-kit-online.jpg",
    includes: ["Caja de materiales enviada a tu puerta", "Grabación de la clase de por vida", "Soporte personalizado por WhatsApp"],
    prices: {
      individual: 120,
      amiguis: 210,
      vip: 270
    }
  }
];

// Datos del catálogo de Regalos
const GIFTS = [
  {
    id: "gift-01",
    name: "Ramo Eterno 'Sol de Primavera'",
    tag: "Listo para regalar 🎁",
    image: "assets/taller-02-margaritas.jpg",
    description: "3 flores amarillas tejidas a mano con lana aterciopelada, envuelto en papel coreano pastel con cinta de satén y aroma floral.",
    price: 95,
    oldPrice: 115,
    badge: "Best Seller"
  },
  {
    id: "gift-02",
    name: "Kit DIY 'Teje tus Flores Amarillas'",
    tag: "Para crear en casa 🧶",
    image: "assets/taller-04-kit-online.jpg",
    description: "Caja kraft con lanas de algodón en tonos amarillos y verdes, ganchillo ergonómico, marcadores, aguja lanera y video tutorial exclusivo.",
    price: 110,
    oldPrice: 130,
    badge: "Ideal Regalo"
  },
  {
    id: "gift-03",
    name: "Gift Card 'Tarde Chill & Tejido'",
    tag: "Experiencia inolvidable 💌",
    image: "assets/taller-01-girasol.jpg",
    description: "Tarjeta de regalo con sobre lacrado y dedicatoria personalizada. Válida para cualquier taller presencial o virtual durante 6 meses.",
    price: 135,
    oldPrice: null,
    badge: "El Favorito de Parejas"
  },
  {
    id: "gift-04",
    name: "Macetita 'Girasol Sonriente'",
    tag: "Mini deco adorable 🌻",
    image: "assets/taller-03-tulipanes.jpg",
    description: "Girasol tejido sobre base de maceta tejida rellena, con carita tierna bordada. Perfecto para escritorio, mesa de noche o el auto.",
    price: 65,
    oldPrice: 80,
    badge: "Cute & Sweet"
  }
];

// Estado global de la aplicación
let currentSelectedEvent = EVENTS[0];
let currentSelectedPlan = "individual"; // individual | amiguis | vip
let isGift = false;
let loFiPlaying = false;
let loFiAudio = null;

// Inicialización cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  renderGifts();
  initCountdown();
  initFAQ();
  initLoFiPlayer();
  setupModalListeners();
});

// Renderizar tarjetas de eventos
function renderEvents() {
  const container = document.getElementById("events-container");
  if (!container) return;

  container.innerHTML = EVENTS.map((evt) => {
    return `
      <div class="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-100 shadow-cute-card flex flex-col justify-between relative overflow-hidden transition-all duration-300">
        <!-- Decoración de fondo suave -->
        <div class="absolute -top-8 -right-8 w-28 h-28 bg-yellow-100 rounded-full opacity-60 blur-xl pointer-events-none"></div>

        <div>
          <!-- Foto ilustrativa del taller -->
          <div class="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-4 border border-amber-100/90 shadow-sm group">
            <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <span class="absolute bottom-2.5 left-3 bg-white/95 backdrop-blur-xs text-stone-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs border border-amber-200/60">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-600"></i> ${evt.flowerType}
            </span>
          </div>

          <!-- Header de tarjeta: Badge de cupos y fecha -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              ${evt.badge}
            </span>
            <span class="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-700"></i> ${evt.location.split('(')[1]?.replace(')', '') || 'Presencial'}
            </span>
          </div>

          <!-- Título y detalles -->
          <h3 class="text-xl sm:text-2xl font-bold text-stone-900 font-heading leading-tight mb-2">
            ${evt.title}
          </h3>
          
          <div class="space-y-1.5 text-sm text-stone-600 mb-5 bg-amber-50/60 p-3 rounded-2xl border border-amber-100/80">
            <p class="flex items-center gap-2 font-medium text-stone-800">
              <i data-lucide="calendar" class="w-4 h-4 text-amber-600"></i> ${evt.date}
            </p>
            <p class="flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-amber-600"></i> ${evt.time}
            </p>
            <p class="flex items-center gap-2">
              <i data-lucide="map-pin" class="w-4 h-4 text-amber-600"></i> ${evt.location}
            </p>
          </div>

          <!-- Lo que incluye -->
          <div class="mb-6">
            <p class="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5">Tu entrada chill incluye:</p>
            <ul class="space-y-2 text-xs sm:text-sm text-stone-600">
              ${evt.includes.map(inc => `
                <li class="flex items-start gap-2">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></i>
                  <span>${inc}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Precios y Botón de Acción -->
        <div class="pt-5 border-t border-amber-100/80 mt-auto">
          <div class="flex items-end justify-between mb-4">
            <div>
              <span class="text-xs text-stone-600 block">Inversión individual</span>
              <div class="flex items-baseline gap-1.5">
                <span class="text-2xl sm:text-3xl font-extrabold text-amber-950">${CONFIG.currencySymbol} ${evt.prices.individual}</span>
                <span class="text-xs text-stone-600">PEN (~$${Math.round(evt.prices.individual * CONFIG.usdRate)} USD)</span>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-block bg-pink-100 text-pink-700 text-[11px] font-bold px-2 py-0.5 rounded-full mb-0.5">
                Plan Amiguis 2x: ${CONFIG.currencySymbol} ${evt.prices.amiguis}
              </span>
              <p class="text-[10px] text-stone-600">Ahorran ${CONFIG.currencySymbol} ${(evt.prices.individual * 2) - evt.prices.amiguis} juntas</p>
            </div>
          </div>

          <button 
            onclick="openBookingModal('${evt.id}')"
            class="w-full btn-cute bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-500 hover:to-yellow-400 text-amber-950 font-bold py-3.5 px-4 rounded-2xl shadow-cute flex items-center justify-center gap-2 text-sm sm:text-base border border-amber-300">
            <i data-lucide="sparkle" class="w-4 h-4 text-amber-900"></i>
            <span>Reservar Mi Cupo</span>
            <i data-lucide="arrow-right" class="w-4 h-4 text-amber-900"></i>
          </button>
          <p class="text-[11px] text-center text-stone-600 mt-2">🔒 Pago seguro y confirmación inmediata vía WhatsApp</p>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Renderizar tarjetas de regalos
function renderGifts() {
  const container = document.getElementById("gifts-container");
  if (!container) return;

  container.innerHTML = GIFTS.map((gift) => {
    return `
      <div class="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-cute-card flex flex-col justify-between relative group hover:border-pink-300 transition-all duration-300">
        <!-- Badge cute -->
        <div class="absolute -top-3 left-6 z-10">
          <span class="bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            ${gift.badge}
          </span>
        </div>

        <div>
          <!-- Foto del producto -->
          <div class="w-full h-44 rounded-2xl overflow-hidden mb-3.5 border border-pink-100 group-hover:border-pink-200">
            <img src="${gift.image}" alt="${gift.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>

          <span class="text-xs font-semibold text-pink-500 tracking-wide uppercase block mb-1">${gift.tag}</span>
          <h3 class="text-lg font-bold text-stone-900 font-heading mb-1.5 group-hover:text-pink-600 transition-colors">
            ${gift.name}
          </h3>
          <p class="text-xs text-stone-600 leading-relaxed mb-4">
            ${gift.description}
          </p>
        </div>

        <div class="pt-4 border-t border-pink-100 mt-auto">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-stone-900">${CONFIG.currencySymbol} ${gift.price}</span>
              ${gift.oldPrice ? `<span class="text-xs text-stone-600 line-through">${CONFIG.currencySymbol} ${gift.oldPrice}</span>` : ''}
            </div>
            <span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
              <i data-lucide="truck" class="w-3.5 h-3.5"></i> Envío rápido
            </span>
          </div>

          <button 
            onclick="orderGiftWhatsApp('${gift.id}')"
            class="w-full btn-cute bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm border border-pink-200 transition-colors">
            <i data-lucide="gift" class="w-4 h-4 text-pink-600"></i>
            <span>Pedir para Regalo</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Cuenta regresiva para el próximo evento
function initCountdown() {
  const countdownEl = document.getElementById("countdown-timer");
  if (!countdownEl) return;

  // Próximo evento de muestra (Sábado 21 de Septiembre 3:30 PM)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 4);
  targetDate.setHours(15, 30, 0, 0);

  function update() {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      countdownEl.innerHTML = `<span class="text-amber-800 font-bold">¡Taller en curso o cerrando inscripciones!</span>`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
      <div class="flex items-center justify-center gap-2 text-stone-800 font-mono text-sm sm:text-base">
        <span class="bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-sm font-bold">${days}d</span> :
        <span class="bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-sm font-bold">${String(hours).padStart(2, '0')}h</span> :
        <span class="bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-sm font-bold">${String(minutes).padStart(2, '0')}m</span> :
        <span class="bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-sm font-bold text-amber-600">${String(seconds).padStart(2, '0')}s</span>
      </div>
    `;
  }

  update();
  setInterval(update, 1000);
}

// Acordeón de FAQ interactivo
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const header = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (header && content) {
      header.addEventListener("click", () => {
        const isOpen = !content.classList.contains("hidden");
        
        // Cerrar todos
        document.querySelectorAll(".faq-answer").forEach(a => a.classList.add("hidden"));
        document.querySelectorAll(".faq-icon").forEach(i => i.style.transform = "rotate(0deg)");

        if (!isOpen) {
          content.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    }
  });
}

// Control del Modal de Reserva
function openBookingModal(eventId) {
  const modal = document.getElementById("booking-modal");
  const evt = EVENTS.find(e => e.id === eventId) || EVENTS[0];
  currentSelectedEvent = evt;

  const eventSelect = document.getElementById("modal-event-select");
  if (eventSelect) {
    eventSelect.value = evt.id;
  }

  updateModalPricing();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  // Efecto cute al abrir
  launchDaisyConfetti();
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function setupModalListeners() {
  const modal = document.getElementById("booking-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close-btn");
  const eventSelect = document.getElementById("modal-event-select");
  const planOptions = document.querySelectorAll('input[name="modal-plan"]');
  const giftCheckbox = document.getElementById("modal-gift-check");

  if (backdrop) backdrop.addEventListener("click", closeBookingModal);
  if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);

  if (eventSelect) {
    eventSelect.addEventListener("change", (e) => {
      const selected = EVENTS.find(ev => ev.id === e.target.value);
      if (selected) {
        currentSelectedEvent = selected;
        updateModalPricing();
      }
    });
  }

  planOptions.forEach(opt => {
    opt.addEventListener("change", (e) => {
      currentSelectedPlan = e.target.value;
      updateModalPricing();
    });
  });

  if (giftCheckbox) {
    giftCheckbox.addEventListener("change", (e) => {
      isGift = e.target.checked;
      const giftFields = document.getElementById("modal-gift-fields");
      if (giftFields) {
        giftFields.classList.toggle("hidden", !isGift);
      }
    });
  }

  // Form submit -> Redirigir a WhatsApp
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitBookingToWhatsApp();
    });
  }
}

// Calcular precios en el modal
function updateModalPricing() {
  const priceDisplay = document.getElementById("modal-total-price");
  const breakdownDisplay = document.getElementById("modal-price-breakdown");
  if (!priceDisplay || !currentSelectedEvent) return;

  let total = currentSelectedEvent.prices[currentSelectedPlan];
  let breakdownText = "";

  if (currentSelectedPlan === "individual") {
    breakdownText = `1 Cupo Individual · ${currentSelectedEvent.title}`;
  } else if (currentSelectedPlan === "amiguis") {
    breakdownText = `Plan Amiguis (2 Cupos con descuento) · ${currentSelectedEvent.title}`;
  } else if (currentSelectedPlan === "vip") {
    breakdownText = `Pase VIP All-Inclusive + Ramo Extra · ${currentSelectedEvent.title}`;
  }

  priceDisplay.textContent = `${CONFIG.currencySymbol} ${total}`;
  if (breakdownDisplay) {
    breakdownDisplay.textContent = breakdownText;
  }
}

// Generar mensaje y abrir WhatsApp
function submitBookingToWhatsApp() {
  const name = document.getElementById("modal-input-name")?.value || "Amiga Tejedora";
  const phone = document.getElementById("modal-input-phone")?.value || "";
  const notes = document.getElementById("modal-input-notes")?.value || "";
  const recipientName = document.getElementById("modal-input-recipient")?.value || "";
  const dedication = document.getElementById("modal-input-dedication")?.value || "";

  const total = currentSelectedEvent.prices[currentSelectedPlan];
  const planName = currentSelectedPlan === "individual" 
    ? "Pase Individual Chill (1 persona)"
    : currentSelectedPlan === "amiguis"
    ? "Plan Amiguis (2 personas - 15% OFF)"
    : "Pase VIP Bloom All-Inclusive";

  let message = `¡Hola *${CONFIG.businessName}*! 🌻✨\n\n`;
  message += `Quiero reservar mi cupo para el taller chill de flores amarillas:\n\n`;
  message += `🗓️ *Taller:* ${currentSelectedEvent.title}\n`;
  message += `📅 *Fecha:* ${currentSelectedEvent.date}\n`;
  message += `⏰ *Horario:* ${currentSelectedEvent.time}\n`;
  message += `📍 *Lugar:* ${currentSelectedEvent.location}\n`;
  message += `🧶 *Plan Elegido:* ${planName}\n`;
  message += `💰 *Total a abonar:* ${CONFIG.currencySymbol} ${total}\n\n`;
  message += `👤 *Mi Nombre:* ${name}\n`;
  if (phone) message += `📱 *Teléfono:* ${phone}\n`;

  if (isGift && recipientName) {
    message += `\n🎁 *¡ES PARA REGALO!*\n`;
    message += `💌 *Para:* ${recipientName}\n`;
    if (dedication) message += `📝 *Dedicatoria:* "${dedication}"\n`;
  }

  if (notes) {
    message += `\n💬 *Mensaje / Dudas:* ${notes}\n`;
  }

  message += `\n¿Me confirman si aún tienen los cupos disponibles y las cuentas de pago (Yape/Plin/Transferencia)? ¡Gracias! 💛`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  // Confeti festivo
  launchDaisyConfetti();

  setTimeout(() => {
    window.open(encodedUrl, "_blank");
    closeBookingModal();
  }, 400);
}

// Pedido directo de regalo por WhatsApp
function orderGiftWhatsApp(giftId) {
  const gift = GIFTS.find(g => g.id === giftId);
  if (!gift) return;

  let message = `¡Hola *${CONFIG.businessName}*! 🎁🌻\n\n`;
  message += `Me encantó este regalo y quisiera pedirlo:\n\n`;
  message += `✨ *Producto:* ${gift.name}\n`;
  message += `🏷️ *Precio:* ${CONFIG.currencySymbol} ${gift.price}\n`;
  message += `📦 *Detalle:* ${gift.description}\n\n`;
  message += `¿Tienen disponibilidad inmediata para entrega / envío y me brindan sus datos de pago? ¡Muchas gracias! 💛`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  launchDaisyConfetti();
  window.open(encodedUrl, "_blank");
}

// Reproductor Lo-Fi Relajante Ambient Widget
function initLoFiPlayer() {
  const toggleBtn = document.getElementById("lofi-toggle-btn");
  const disc = document.getElementById("lofi-disc");
  const statusText = document.getElementById("lofi-status");

  if (!toggleBtn) return;

  // Creamos un sintetizador de audio binaural / ambiente lo-fi relajante usando Web Audio API
  // para que funcione 100% sin depender de archivos de terceros caídos ni bloqueos de CORS
  let audioCtx = null;
  let oscillator1 = null;
  let oscillator2 = null;
  let gainNode = null;

  function createCozyAmbientSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Sonido de acordes cálidos pentatónicos relajantes (Vibes de tardes de café)
      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

      oscillator1 = audioCtx.createOscillator();
      oscillator1.type = "sine";
      oscillator1.frequency.setValueAtTime(261.63, audioCtx.currentTime); // C4

      oscillator2 = audioCtx.createOscillator();
      oscillator2.type = "triangle";
      oscillator2.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4

      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator1.start();
      oscillator2.start();
    } catch (e) {
      console.log("Audio not supported or blocked by user gesture");
    }
  }

  toggleBtn.addEventListener("click", () => {
    loFiPlaying = !loFiPlaying;

    if (loFiPlaying) {
      if (!audioCtx) {
        createCozyAmbientSound();
      } else if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      if (disc) disc.classList.add("animate-spin-slow");
      if (statusText) statusText.textContent = "Sonando: Lo-Fi Café Relax ☕";
      toggleBtn.classList.add("bg-amber-300");
    } else {
      if (audioCtx && audioCtx.state === "running") {
        audioCtx.suspend();
      }
      if (disc) disc.classList.remove("animate-spin-slow");
      if (statusText) statusText.textContent = "Música Chill (Pausada)";
      toggleBtn.classList.remove("bg-amber-300");
    }
  });
}

// Lanzar confeti de margaritas amarillas
function launchDaisyConfetti() {
  if (typeof confetti === "function") {
    // Usar la librería canvas-confetti con tonos amarillos y pastel
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FEF08A', '#FDE047', '#FACC15', '#FCE7F3', '#86EFAC']
    });
  }
}
