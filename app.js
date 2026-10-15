/**
 * =========================================================================
 * JAYEDITS - 41-VIDEO SMARTPHONE REEL CONTROLLER
 * Ultra-Fast Category Switching & 9:16 Interactive Video Player
 * =========================================================================
 */

let currentCatIndex = 0;
let currentVideoIndexInCat = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", () => {
  initPortfolioApp();
});

function initPortfolioApp() {
  initWhatsAppLinks();
  initShowcase();
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
  setHref("heroWhatsappBtn", "Hi Jay! I saw your video portfolio and want to discuss short-form videos for my business.");
  setHref("footerWhatsappBtn", "Hi Jay! I want to discuss a video project for my business. Are you available?");

  // Pricing buttons
  setHref("pricingCard1Btn", "Hi Jay! I'm interested in ordering a single reel (₹2,000 package) with 1 free revision.");
  setHref("pricingCard2Btn", "Hi Jay! I'm interested in the Monthly Pack (8 to 15 reels/month). What are the package rates?");
  setHref("pricingCard3Btn", "Hi Jay! I want to discuss a custom factory tour / commercial video editing project.");
}

/**
 * Initialize 41-Video Smartphone Showcase
 */
function initShowcase() {
  renderCategoryPills();
  switchCategory(0, false);
  attachShowcaseEvents();
}

/**
 * Get active category object and its videos
 */
function getActiveCategory() {
  return PORTFOLIO_CATEGORIES[currentCatIndex] || PORTFOLIO_CATEGORIES[0];
}

function getVideosInActiveCategory() {
  const activeCat = getActiveCategory();
  return ALL_VIDEOS.filter(v => v.category === activeCat.id);
}

function getActiveVideo() {
  const videos = getVideosInActiveCategory();
  return videos[currentVideoIndexInCat] || videos[0];
}

/**
 * Render Category Navigation Pills (with real counts)
 */
function renderCategoryPills() {
  const container = document.getElementById("reelsPillNav");
  if (!container) return;

  container.innerHTML = PORTFOLIO_CATEGORIES.map((cat, index) => {
    const count = ALL_VIDEOS.filter(v => v.category === cat.id).length;
    return `
      <button class="reel-nav-pill ${index === currentCatIndex ? 'active' : ''}" data-cat-index="${index}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
        <span class="reel-pill-count">${count}</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".reel-nav-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const idx = parseInt(pill.getAttribute("data-cat-index"), 10);
      switchCategory(idx, false);
    });
  });
}

/**
 * Switch Active Category
 */
function switchCategory(newCatIndex, autoPlay = false) {
  if (newCatIndex < 0) newCatIndex = PORTFOLIO_CATEGORIES.length - 1;
  if (newCatIndex >= PORTFOLIO_CATEGORIES.length) newCatIndex = 0;

  currentCatIndex = newCatIndex;
  currentVideoIndexInCat = 0; // Reset to first video in this category

  // 1. Update Top Pills
  const pills = document.querySelectorAll(".reel-nav-pill");
  pills.forEach((p, idx) => {
    if (idx === currentCatIndex) p.classList.add("active");
    else p.classList.remove("active");
  });

  // 2. Update In-Card Category Stepper Name
  const activeCat = getActiveCategory();
  const activeCatName = document.getElementById("activeCatName");
  if (activeCatName) {
    activeCatName.textContent = `${activeCat.icon} ${activeCat.name}`;
  }

  // 3. Render Phone & Story Bars
  renderStoryBars();
  loadCurrentVideo(autoPlay);
}

/**
 * Render Instagram Story Progress Bars at Top of Phone
 */
function renderStoryBars() {
  const bar = document.getElementById("storyProgressBar");
  if (!bar) return;

  const videos = getVideosInActiveCategory();
  bar.innerHTML = videos.map((_, index) => {
    let status = "";
    if (index < currentVideoIndexInCat) status = "viewed";
    else if (index === currentVideoIndexInCat) status = "active";
    return `<div class="story-segment ${status}" data-video-index="${index}"></div>`;
  }).join("");
}

/**
 * Load Active Video into Phone Frame
 */
function loadCurrentVideo(autoPlay = false) {
  const video = getActiveVideo();
  const activeCat = getActiveCategory();
  const videosInCat = getVideosInActiveCategory();

  if (!video) return;

  // 1. Update Story Bars
  renderStoryBars();

  // 2. Update Phone Floating Badge
  const badgeIcon = document.getElementById("badgeIcon");
  const badgeText = document.getElementById("badgeText");
  if (badgeIcon) badgeIcon.textContent = activeCat.icon;
  if (badgeText) badgeText.textContent = video.tag || activeCat.name;

  // 3. Update Video Screen
  const screen = document.getElementById("phoneScreen");
  if (screen) {
    if (autoPlay) {
      screen.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
          title="${escapeHtml(video.title)}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    } else {
      // Automatic high-quality YouTube thumbnail
      const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
      screen.innerHTML = `
        <div class="phone-preview-box" id="phonePreviewBox">
          <img src="${thumbUrl}" alt="${escapeHtml(video.title)}" />
          <div class="phone-preview-overlay">
            <div class="phone-play-btn">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
        </div>
      `;

      // Tap play button to stream directly inside phone
      const previewBox = document.getElementById("phonePreviewBox");
      if (previewBox) {
        previewBox.addEventListener("click", () => {
          loadCurrentVideo(true);
        });
      }
    }
  }

  // 4. Update Video Metadata Card
  const clientTag = document.getElementById("reelClientTag");
  const title = document.getElementById("reelTitle");
  const desc = document.getElementById("reelDesc");
  const counter = document.getElementById("reelCounter");
  const whatsappBtn = document.getElementById("reelWhatsappBtn");
  const hintEl = document.getElementById("showcaseHint");

  if (clientTag) clientTag.textContent = `Client: ${video.client}`;
  if (title) title.textContent = video.title;
  if (desc) desc.textContent = video.description;
  if (counter) counter.textContent = `${currentVideoIndexInCat + 1} of ${videosInCat.length}`;

  if (hintEl) {
    hintEl.innerHTML = `
      <i class="fa-solid fa-hand-pointer"></i> 
      <span>Tap left/right on phone to switch • <strong>${currentVideoIndexInCat + 1} of ${videosInCat.length} in ${escapeHtml(activeCat.name)}</strong></span>
    `;
  }

  // 5. Pre-fill WhatsApp CTA with this exact video title
  if (whatsappBtn) {
    const customMsg = `Hi Jay! I saw your portfolio video: "${video.title}" (${video.client}). I want a similar video for my business. Can we talk?`;
    whatsappBtn.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
  }
}

/**
 * Navigate to Next Video within category
 */
function nextVideo() {
  const videos = getVideosInActiveCategory();
  if (currentVideoIndexInCat < videos.length - 1) {
    currentVideoIndexInCat++;
    loadCurrentVideo(false);
  } else {
    // Reached the end of category -> loop back to video 1
    currentVideoIndexInCat = 0;
    loadCurrentVideo(false);
  }
}

/**
 * Navigate to Previous Video within category
 */
function prevVideo() {
  const videos = getVideosInActiveCategory();
  if (currentVideoIndexInCat > 0) {
    currentVideoIndexInCat--;
    loadCurrentVideo(false);
  } else {
    currentVideoIndexInCat = videos.length - 1;
    loadCurrentVideo(false);
  }
}

/**
 * Attach Event Listeners (Arrows, Steppers, Taps, Gestures, Keyboard)
 */
function attachShowcaseEvents() {
  // 1. Navigation Arrows (Next / Prev Video)
  const nextBtn = document.getElementById("nextReelBtn");
  const prevBtn = document.getElementById("prevReelBtn");
  if (nextBtn) nextBtn.addEventListener("click", nextVideo);
  if (prevBtn) prevBtn.addEventListener("click", prevVideo);

  // 2. In-Card Category Stepper (Prev / Next Industry)
  const prevCatBtn = document.getElementById("prevCatBtn");
  const nextCatBtn = document.getElementById("nextCatBtn");
  if (prevCatBtn) {
    prevCatBtn.addEventListener("click", () => {
      switchCategory(currentCatIndex - 1, false);
    });
  }
  if (nextCatBtn) {
    nextCatBtn.addEventListener("click", () => {
      switchCategory(currentCatIndex + 1, false);
    });
  }

  // 3. Tap Zones (Left 25% = Prev, Right 25% = Next)
  const tapLeft = document.getElementById("tapLeftZone");
  const tapRight = document.getElementById("tapRightZone");
  if (tapLeft) tapLeft.addEventListener("click", prevVideo);
  if (tapRight) tapRight.addEventListener("click", nextVideo);

  // 4. Keyboard Arrow Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextVideo();
    if (e.key === "ArrowLeft") prevVideo();
    if (e.key === "ArrowUp") switchCategory(currentCatIndex - 1, false);
    if (e.key === "ArrowDown") switchCategory(currentCatIndex + 1, false);
  });

  // 5. Touch Swipe on Phone Mockup
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
  if (Math.abs(diffX) > 40) {
    if (diffX < 0) {
      // Swiped Left -> Next Video
      nextVideo();
    } else {
      // Swiped Right -> Prev Video
      prevVideo();
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
