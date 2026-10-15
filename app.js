/**
 * =========================================================================
 * Interactive Single-Reel Smartphone Portfolio Controller
 * Minimal, Fast, 5-Second Scannable Experience (Zero Reading Bloat)
 * =========================================================================
 */

// Featured signature videos representing each distinct capability
const FEATURED_REELS = [
  {
    categoryName: "Factory & Process",
    icon: "🏭",
    title: "Shiv PVC Furniture - Factory Process & Beat Cuts",
    client: "Shiv PVC Furniture",
    tag: "Beat-Synced BTS",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&auto=format&fit=crop&q=80",
    description: "Raw manufacturing, cutting machinery, and assembly synced to rhythmic music beats."
  },
  {
    categoryName: "Luxury Showroom",
    icon: "✨",
    title: "Jalaram Fabrics - Luxury Showroom & Speed-Ramps",
    client: "Jalaram Fabrics",
    tag: "Luxury Retail",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&auto=format&fit=crop&q=80",
    description: "Cinematic camera sweeps, speed-curves, and texture zooms that make products look 10x more premium."
  },
  {
    categoryName: "Doctor & Explainer",
    icon: "🗣️",
    title: "Doctor Health Advice - Dynamic Animated Captions",
    client: "Medical Clinic",
    tag: "Explainer & Captions",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&auto=format&fit=crop&q=80",
    description: "Word-by-word subtitles in Gujarati, Hindi & English with punchy retention zoom-cuts."
  },
  {
    categoryName: "Services & Pet Spa",
    icon: "🐾",
    title: "Dog Spa Grooming - High-Energy Pampering Reel",
    client: "Paws & Bubbles Spa",
    tag: "Services & Pets",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=700&auto=format&fit=crop&q=80",
    description: "Wholesome, upbeat customer experience reel engineered to stop social media scrolling."
  },
  {
    categoryName: "Product Motion Ads",
    icon: "🚀",
    title: "Sky Sleep Mattress - 3D Photo Motion Ad",
    client: "Sky Sleep Mattress",
    tag: "Motion Graphics",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&auto=format&fit=crop&q=80",
    description: "Created purely from catalog photos: layered animations, typography, and upbeat music."
  },
  {
    categoryName: "YouTube to Shorts",
    icon: "✂️",
    title: "Podcast Viral Repurpose - High-Hook Short",
    client: "Creator Channel",
    tag: "Viral Repurposing",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=700&auto=format&fit=crop&q=80",
    description: "Extracting 60-second punchy insights from long-form videos with dual-camera zooms & captions."
  }
];

let currentReelIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", () => {
  initPortfolioApp();
});

function initPortfolioApp() {
  initWhatsAppLinks();
  initReelsShowcase();
  initFaqAccordion();
  setCurrentYear();
}

/**
 * Configure all WhatsApp CTAs with custom pre-filled messages
 */
function initWhatsAppLinks() {
  const phone = PORTFOLIO_CONFIG.whatsappNumber;
  const baseUrl = `https://wa.me/${phone}?text=`;

  const setHref = (id, msg) => {
    const el = document.getElementById(id);
    if (el) el.href = `${baseUrl}${encodeURIComponent(msg)}`;
  };

  setHref("floatingWhatsapp", PORTFOLIO_CONFIG.whatsappDefaultMsg);
  setHref("navWhatsappBtn", PORTFOLIO_CONFIG.whatsappDefaultMsg);
  setHref("heroWhatsappBtn", "Hi! I saw your video portfolio and want to discuss short-form videos for my business.");
  setHref("footerWhatsappBtn", "Hi! I want to discuss a video project for my business. Are you available?");

  // Pricing buttons
  setHref("pricingCard1Btn", "Hi! I'm interested in ordering a single reel (₹2,000 package) with 1 free revision.");
  setHref("pricingCard2Btn", "Hi! I'm interested in the Monthly Pack (8 to 15 reels/month). What are the package rates?");
  setHref("pricingCard3Btn", "Hi! I want to discuss a custom factory tour / commercial video editing project.");
}

/**
 * Initialize Interactive Smartphone Showcase
 */
function initReelsShowcase() {
  renderReelsPillNav();
  renderStoryBars();
  loadReel(currentReelIndex, false);
  attachShowcaseEvents();
}

/**
 * Render Quick-Switch Category Pills above Phone
 */
function renderReelsPillNav() {
  const container = document.getElementById("reelsPillNav");
  if (!container) return;

  container.innerHTML = FEATURED_REELS.map((reel, index) => `
    <button class="reel-nav-pill ${index === currentReelIndex ? 'active' : ''}" data-index="${index}">
      <span>${reel.icon}</span>
      <span>${reel.categoryName}</span>
    </button>
  `).join("");

  container.querySelectorAll(".reel-nav-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const idx = parseInt(pill.getAttribute("data-index"), 10);
      switchReel(idx);
    });
  });
}

/**
 * Render Instagram Story Progress Bar at Top of Phone
 */
function renderStoryBars() {
  const bar = document.getElementById("storyProgressBar");
  if (!bar) return;

  bar.innerHTML = FEATURED_REELS.map((_, index) => {
    let status = "";
    if (index < currentReelIndex) status = "viewed";
    else if (index === currentReelIndex) status = "active";
    return `<div class="story-segment ${status}" data-index="${index}"></div>`;
  }).join("");
}

/**
 * Load Active Reel into Phone Mockup
 */
function loadReel(index, autoPlay = false) {
  const reel = FEATURED_REELS[index];
  if (!reel) return;

  currentReelIndex = index;

  // 1. Update Story Bars
  renderStoryBars();

  // 2. Update Pills
  const pills = document.querySelectorAll(".reel-nav-pill");
  pills.forEach((p, idx) => {
    if (idx === index) p.classList.add("active");
    else p.classList.remove("active");
  });

  // 3. Update Phone Badge
  const badgeIcon = document.getElementById("badgeIcon");
  const badgeText = document.getElementById("badgeText");
  if (badgeIcon) badgeIcon.textContent = reel.icon;
  if (badgeText) badgeText.textContent = reel.categoryName;

  // 4. Update Screen Content
  const screen = document.getElementById("phoneScreen");
  if (screen) {
    if (autoPlay) {
      screen.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
          title="${escapeHtml(reel.title)}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    } else {
      screen.innerHTML = `
        <div class="phone-preview-box" id="phonePreviewBox">
          <img src="${reel.thumbnail}" alt="${escapeHtml(reel.title)}" />
          <div class="phone-preview-overlay">
            <div class="phone-play-btn">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
        </div>
      `;

      // Clicking preview triggers inline video playback
      const previewBox = document.getElementById("phonePreviewBox");
      if (previewBox) {
        previewBox.addEventListener("click", () => {
          loadReel(currentReelIndex, true);
        });
      }
    }
  }

  // 5. Update Metadata Card below Phone
  const clientTag = document.getElementById("reelClientTag");
  const title = document.getElementById("reelTitle");
  const desc = document.getElementById("reelDesc");
  const counter = document.getElementById("reelCounter");
  const whatsappBtn = document.getElementById("reelWhatsappBtn");

  if (clientTag) clientTag.textContent = `Client: ${reel.client}`;
  if (title) title.textContent = reel.title;
  if (desc) desc.textContent = reel.description;
  if (counter) counter.textContent = `${index + 1} of ${FEATURED_REELS.length}`;

  if (whatsappBtn) {
    const customMsg = `Hi! I saw your portfolio edit: "${reel.title}" for ${reel.client}. I'd like a quote for a similar video for my business.`;
    whatsappBtn.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
  }
}

/**
 * Switch Reel
 */
function switchReel(newIndex) {
  if (newIndex < 0) newIndex = FEATURED_REELS.length - 1;
  if (newIndex >= FEATURED_REELS.length) newIndex = 0;
  loadReel(newIndex, false);
}

function nextReel() {
  switchReel(currentReelIndex + 1);
}

function prevReel() {
  switchReel(currentReelIndex - 1);
}

/**
 * Attach Intuitive Navigation Events (Arrows, Taps, Swipes, Keyboard)
 */
function attachShowcaseEvents() {
  // 1. Navigation Arrows
  const nextBtn = document.getElementById("nextReelBtn");
  const prevBtn = document.getElementById("prevReelBtn");
  if (nextBtn) nextBtn.addEventListener("click", nextReel);
  if (prevBtn) prevBtn.addEventListener("click", prevReel);

  // 2. Tap zones (Tap left = Prev, Tap right = Next)
  const tapLeft = document.getElementById("tapLeftZone");
  const tapRight = document.getElementById("tapRightZone");
  if (tapLeft) tapLeft.addEventListener("click", prevReel);
  if (tapRight) tapRight.addEventListener("click", nextReel);

  // 3. Keyboard Arrows
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextReel();
    if (e.key === "ArrowLeft") prevReel();
  });

  // 4. Touch swipe gestures on phone frame
  const phoneFrame = document.getElementById("phoneFrame");
  if (phoneFrame) {
    phoneFrame.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    phoneFrame.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
}

function handleSwipe() {
  const diffX = touchEndX - touchStartX;
  if (Math.abs(diffX) > 45) {
    if (diffX < 0) {
      // Swiped Left -> Next
      nextReel();
    } else {
      // Swiped Right -> Prev
      prevReel();
    }
  }
}

/**
 * Accordion interaction for FAQ section
 */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      items.forEach(i => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Safe HTML escape
 */
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
