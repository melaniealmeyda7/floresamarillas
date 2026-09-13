/**
 * Amarillo Miel · Flores Amarillas, Llaveritos & Planes Chill
 * Lógica interactiva: Catálogo dinámico con filtros, Sidebar Drawer, Modo Próximamente Talleres y WhatsApp Checkout
 */

// Configuración de contacto
const CONFIG = {
  whatsappNumber: "51987654321", // Reemplazar con el número del negocio (con código de país sin +)
  businessName: "Amarillo Miel · Flores Amarillas & Llaveritos",
  currencySymbol: "S/.",
  usdRate: 0.27
};

// Catálogo completo de Productos Físicos (Girasoles, Tulipanes, Margaritas, Llaveros, Packs)
const PRODUCTS = [
  // Llaveritos Cute (Fotos reales del cliente)
  {
    id: "prod-llavero-duo",
    name: "Dúo Llaveritos Amiguis: Girasol & Margarita",
    category: "llaveros",
    price: 35,
    oldPrice: 42,
    tag: "¡Más Pedido! 🔑",
    badge: "2 Llaveritos",
    image: "assets/llaveros-girasol-margarita.jpg",
    description: "Hermosa parejita de llaveros tejidos a mano (girasol con carita sonriente + margarita blanca con centro amarillo) con argolla y hojita verde modelable.",
    popular: true
  },
  {
    id: "prod-llavero-tulipan-ramo",
    name: "Llavero Mini Ramo Tulipán en Cono Kraft",
    category: "llaveros",
    price: 22,
    oldPrice: 28,
    tag: "Detalle Tierno 🌷",
    badge: "Empaque Individual",
    image: "assets/llavero-mini-ramo-tulipan.jpg",
    description: "Mini tulipán amarillo tejido con envoltura tipo cono en papel kraft con lacito y bolsita transparente. ¡El regalito perfecto listo para entregar!",
    popular: true
  },
  {
    id: "prod-llavero-tulipanes-pack",
    name: "Pack 5 Llaveros Tulipanes Amarillos",
    category: "llaveros",
    price: 65,
    oldPrice: 85,
    tag: "Pack Ahorro 🎁",
    badge: "5 Unidades",
    image: "assets/llaveros-tulipanes-pack.jpg",
    description: "Set de 5 llaveritos de tulipanes tejidos, cada uno en su bolsita transparente individual con tarjeta de agradecimiento. Ideal para souvenirs o amigas.",
    popular: true
  },
  {
    id: "prod-llavero-girasol-dorado",
    name: "Llavero Girasol Sonriente con Broche Dorado",
    category: "llaveros",
    price: 22,
    oldPrice: 26,
    tag: "Kawaii ✨",
    badge: "Broche Dorado",
    image: "assets/llaveros-florcitas.jpg",
    description: "Girasol amarillo tejido con carita tierna bordada y broche mosquetón dorado de alta resistencia para colgar de llaves, mochilas o carteras.",
    popular: false
  },

  // Tulipanes
  {
    id: "prod-tulipan-caja-luces",
    name: "Caja de Regalo con Luces & Tulipanes Eternos",
    category: "tulipanes",
    price: 125,
    oldPrice: 150,
    tag: "Edición Romántica 💖",
    badge: "Incluye Luces LED",
    image: "assets/caja-tulipanes-luces.jpg",
    description: "Caja kraft premium con viruta de papel, ramo de 3 tulipanes tejidos en papel coreano con lazo de satén y serie de luces LED cálidas para iluminar tu sorpresa.",
    popular: true
  },
  {
    id: "prod-tulipanes-ramo-florero",
    name: "Ramo Deluxe: Tulipanes Amarillos en Florero",
    category: "tulipanes",
    price: 135,
    oldPrice: 160,
    tag: "Decoración Eterna 🌷",
    badge: "Ramo Completo",
    image: "assets/taller-03-tulipanes.jpg",
    description: "Ramo abundante de tulipanes amarillos tejidos a crochet con tallos y hojas largas modelables. Incluye florero cerámico y lazo rústico.",
    popular: false
  },

  // Girasoles
  {
    id: "prod-girasol-individual",
    name: "Girasol Sol de Primavera con Café & Relax",
    category: "girasoles",
    price: 55,
    oldPrice: 70,
    tag: "El Favorito del 21 Sept 🌻",
    badge: "Flor Emblemática",
    image: "assets/taller-01-girasol.jpg",
    description: "Girasol grande tejido con centro espiral color café y pétalos puntiagudos. Envuelto individualmente en papel waterproof pastel con dedicatoria personalizada.",
    popular: true
  },

  // Margaritas
  {
    id: "prod-margaritas-ramillete",
    name: "Ramillete Silvestre de Margaritas Amarillas",
    category: "margaritas",
    price: 95,
    oldPrice: 115,
    tag: "Golden Hour 🌼",
    badge: "Ramillete Completo",
    image: "assets/taller-02-margaritas.jpg",
    description: "Ramillete campestre de margaritas amarillas y blancas con hojas verdes, envuelto en papel coreano crema con lazo de yute.",
    popular: false
  },

  // Packs & DIY
  {
    id: "prod-kit-diy-casa",
    name: "Kit DIY 'Teje tus Flores Amarillas en Casa'",
    category: "packs",
    price: 110,
    oldPrice: 130,
    tag: "Aprende a tu Ritmo 🧶",
    badge: "Kit Completo",
    image: "assets/taller-04-kit-online.jpg",
    description: "Caja completa con ovillos de algodón amarillo y verde salvia, aguja ergonómica de bambú, marcadores, aguja lanera y guía ilustrada paso a paso.",
    popular: false
  }
];

// Talleres en Modo "Próximamente" (Lista de espera VIP)
const UPCOMING_WORKSHOPS = [
  {
    id: "ws-01",
    title: "Tarde Chill de Girasoles & Lattes",
    season: "Nueva Temporada Primavera 2026",
    statusBadge: "⏳ Próximamente",
    location: "Cafetería de Especialidad (Miraflores)",
    flowerType: "Girasol & Margarita Amarilla",
    image: "assets/taller-01-girasol.jpg",
    description: "3 horas de pura desconexión tejiendo pétalos de girasol con café de especialidad y pastries gourmet en un jardín interior aesthetic.",
    benefits: ["Materiales premium incluidos", "Matcha o Latte + Postre artesanal", "Tote Bag bordada de regalo"]
  },
  {
    id: "ws-02",
    title: "Sunset & Crochet: Ramillete de Margaritas",
    season: "Nueva Temporada Primavera 2026",
    statusBadge: "⏳ Próximamente",
    location: "Jardín Secreto (San Isidro)",
    flowerType: "Ramillete 3 Margaritas Amarillas",
    image: "assets/taller-02-margaritas.jpg",
    description: "Aprende a tejer un ramillete primaveral durante la hora dorada con mocktails refrescantes y playlist relajante.",
    benefits: ["Guía ilustrada paso a paso", "Bebida frutal + galletas caseras", "Foto polaroid de recuerdo"]
  },
  {
    id: "ws-03",
    title: "Brunch & Tulipanes Amarillos",
    season: "Nueva Temporada Primavera 2026",
    statusBadge: "⏳ Próximamente",
    location: "Green Atelier & Café (Barranco)",
    flowerType: "Tulipán Amarillo & Florero",
    image: "assets/taller-03-tulipanes.jpg",
    description: "Una mañana de sábado con tostadas gourmet, café calientito y el paso a paso para tejer tulipanes tridimensionales.",
    benefits: ["Kit de maderas y ganchillo", "Brunch completo incluido", "Acceso a comunidad VIP"]
  },
  {
    id: "ws-04",
    title: "Taller Virtual en Vivo + Kit a tu Puerta",
    season: "Transmisión HD + Envíos Nacionales",
    statusBadge: "📦 Lista de Espera",
    location: "Zoom HD + Kit Físico a Domicilio",
    flowerType: "Macetita Girasol Sonriente",
    image: "assets/taller-04-kit-online.jpg",
    description: "Recibe la caja con todos los materiales en tu casa y conéctate en vivo para tejer juntas desde la comodidad de tu sala.",
    benefits: ["Envío gratis del kit a tu puerta", "Grabación de por vida", "Soporte personalizado vía WhatsApp"]
  }
];

// Estado global
let activeCategory = "all";
let loFiPlaying = false;

// Inicialización del DOM
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  renderUpcomingWorkshops();
  initSidebar();
  initFAQ();
  initLoFiPlayer();
  setupModalListeners();
});

// Renderizar Productos Dinámicos con Filtros
function renderProducts(category = "all") {
  const container = document.getElementById("products-container");
  if (!container) return;

  activeCategory = category;

  const filtered = category === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);

  container.innerHTML = filtered.map((prod) => {
    return `
      <div class="bg-white rounded-3xl p-5 border-2 border-amber-100 shadow-cute-card flex flex-col justify-between relative group hover:border-amber-300 transition-all duration-300">
        <!-- Badge cute flotante -->
        <div class="absolute -top-3 left-6 z-10">
          <span class="bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-xs border border-amber-300">
            ${prod.badge}
          </span>
        </div>

        <div>
          <!-- Foto del producto con hover zoom suave -->
          <div class="w-full h-52 sm:h-56 rounded-2xl overflow-hidden mb-3.5 border border-amber-100/90 relative group-hover:shadow-md transition-shadow">
            <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
            <span class="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-stone-800 px-2.5 py-0.5 rounded-full shadow-xs">
              ${prod.tag}
            </span>
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-stone-900 font-heading mb-1.5 group-hover:text-amber-700 transition-colors leading-snug">
            ${prod.name}
          </h3>
          <p class="text-xs text-stone-600 leading-relaxed mb-4">
            ${prod.description}
          </p>
        </div>

        <div class="pt-3 border-t border-amber-100 mt-auto">
          <div class="flex items-center justify-between mb-3.5">
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black text-amber-950">${CONFIG.currencySymbol} ${prod.price}</span>
              ${prod.oldPrice ? `<span class="text-xs text-stone-400 line-through">${CONFIG.currencySymbol} ${prod.oldPrice}</span>` : ''}
            </div>
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i> Listo para enviar
            </span>
          </div>

          <button 
            onclick="orderProductWhatsApp('${prod.id}')"
            class="w-full btn-cute bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-500 hover:to-yellow-400 text-amber-950 font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm border border-amber-300 shadow-cute">
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-700"></i>
            <span>Pedir por WhatsApp</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Actualizar estilos activos de los botones de pestañas
  document.querySelectorAll(".tab-filter-btn").forEach(btn => {
    const cat = btn.getAttribute("data-category");
    if (cat === category) {
      btn.className = "tab-filter-btn shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-amber-400 text-amber-950 border-2 border-amber-400 shadow-sm transition-all";
    } else {
      btn.className = "tab-filter-btn shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-stone-700 border-2 border-amber-100 hover:border-amber-300 hover:bg-amber-50 transition-all";
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Filtrar productos al hacer clic en las pestañas
function filterCategory(cat) {
  renderProducts(cat);
}

// Renderizar Talleres en Modo "Próximamente"
function renderUpcomingWorkshops() {
  const container = document.getElementById("upcoming-workshops-container");
  if (!container) return;

  container.innerHTML = UPCOMING_WORKSHOPS.map((ws) => {
    return `
      <div class="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-cute-card flex flex-col justify-between relative overflow-hidden transition-all duration-300">
        <div>
          <!-- Foto ilustrativa -->
          <div class="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 border border-amber-100/90 shadow-xs">
            <img src="${ws.image}" alt="${ws.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent"></div>
            <span class="absolute top-3 right-3 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-sm border border-amber-300">
              ${ws.statusBadge}
            </span>
            <span class="absolute bottom-2.5 left-3 bg-white/95 text-stone-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <i data-lucide="map-pin" class="w-3 h-3 text-amber-600"></i> ${ws.location}
            </span>
          </div>

          <!-- Título y temporada -->
          <span class="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-1">${ws.season}</span>
          <h3 class="text-xl font-bold text-stone-900 font-heading mb-2">
            ${ws.title}
          </h3>
          <p class="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            ${ws.description}
          </p>

          <!-- Beneficios -->
          <ul class="space-y-1.5 text-xs text-stone-600 mb-6 bg-amber-50/70 p-3 rounded-2xl border border-amber-100">
            ${ws.benefits.map(b => `
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
                <span>${b}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Botón de Lista de Espera -->
        <div class="pt-3 border-t border-amber-100">
          <button 
            onclick="joinWaitlistWhatsApp('${ws.id}')"
            class="w-full btn-cute bg-white hover:bg-pink-50 text-stone-800 hover:text-pink-900 font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm border-2 border-pink-200 shadow-xs transition-colors">
            <i data-lucide="bell" class="w-4 h-4 text-pink-500"></i>
            <span>Avisarme cuando abran cupos</span>
          </button>
          <p class="text-[10px] text-center text-stone-600 mt-1.5">🎁 Recibirás 15% OFF exclusivo en preventa</p>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Control de la Barra Lateral (Sidebar Drawer)
function initSidebar() {
  const sidebar = document.getElementById("sidebar-menu");
  const backdrop = document.getElementById("sidebar-backdrop");
  const openBtn = document.getElementById("sidebar-open-btn");
  const closeBtn = document.getElementById("sidebar-close-btn");
  const links = document.querySelectorAll(".sidebar-link");

  if (openBtn) {
    openBtn.addEventListener("click", openSidebar);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeSidebar);
  }
  links.forEach(link => {
    link.addEventListener("click", closeSidebar);
  });
}

function openSidebar() {
  const sidebar = document.getElementById("sidebar-menu");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (!sidebar || !backdrop) return;

  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("translate-x-0");
  backdrop.classList.remove("hidden");
  setTimeout(() => {
    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");
  }, 10);
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar-menu");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (!sidebar || !backdrop) return;

  sidebar.classList.remove("translate-x-0");
  sidebar.classList.add("translate-x-full");
  backdrop.classList.remove("opacity-100");
  backdrop.classList.add("opacity-0");
  setTimeout(() => {
    backdrop.classList.add("hidden");
    document.body.style.overflow = "auto";
  }, 300);
}

// Pedido directo de producto a WhatsApp
function orderProductWhatsApp(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  let message = `¡Hola *${CONFIG.businessName}*! 🌻✨\n\n`;
  message += `Quiero hacer un pedido de este producto:\n\n`;
  message += `📦 *Producto:* ${prod.name}\n`;
  message += `🏷️ *Precio:* ${CONFIG.currencySymbol} ${prod.price}\n`;
  message += `✨ *Detalle:* ${prod.description}\n\n`;
  message += `¿Tienen disponibilidad inmediata para envío o entrega y me brindan sus números de pago (Yape/Plin/Transferencia)? ¡Gracias! 💛`;

  const encoded = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  launchDaisyConfetti();
  window.open(encoded, "_blank");
}

// Registro a Lista de Espera VIP de Talleres vía WhatsApp
function joinWaitlistWhatsApp(workshopId) {
  const ws = UPCOMING_WORKSHOPS.find(w => w.id === workshopId);
  const title = ws ? ws.title : "Talleres de Flores Amarillas";

  let message = `¡Hola *${CONFIG.businessName}*! 🌻☕\n\n`;
  message += `Quiero unirme a la *Lista de Espera VIP* para enterarme primero de las próximas fechas de talleres y recibir el 15% OFF de preventa:\n\n`;
  message += `🗓️ *Taller de interés:* ${title}\n\n`;
  message += `Por favor, avísenme apenas se abran las inscripciones. ¡Muchas gracias! 💛`;

  const encoded = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  launchDaisyConfetti();
  window.open(encoded, "_blank");
}

// Modal genérico / personalizado de pedido
function setupModalListeners() {
  const modal = document.getElementById("booking-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close-btn");

  if (backdrop) backdrop.addEventListener("click", closeBookingModal);
  if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// FAQ Interactivo
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const header = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (header && content) {
      header.addEventListener("click", () => {
        const isOpen = !content.classList.contains("hidden");
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

// Reproductor Lo-Fi Relajante
function initLoFiPlayer() {
  const toggleBtn = document.getElementById("lofi-toggle-btn");
  const disc = document.getElementById("lofi-disc");
  const statusText = document.getElementById("lofi-status");

  if (!toggleBtn) return;

  let audioCtx = null;
  let oscillator1 = null;
  let oscillator2 = null;
  let gainNode = null;

  function createCozyAmbientSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

      oscillator1 = audioCtx.createOscillator();
      oscillator1.type = "sine";
      oscillator1.frequency.setValueAtTime(261.63, audioCtx.currentTime);

      oscillator2 = audioCtx.createOscillator();
      oscillator2.type = "triangle";
      oscillator2.frequency.setValueAtTime(329.63, audioCtx.currentTime);

      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator1.start();
      oscillator2.start();
    } catch (e) {
      console.log("Audio not supported or blocked");
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

// Confeti Festivo de Margaritas
function launchDaisyConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FEF08A', '#FDE047', '#FACC15', '#FCE7F3', '#86EFAC']
    });
  }
}
