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
  if (!activeCat || activeCat.id === "all") {
    return ALL_VIDEOS;
  }
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
    const count = cat.id === "all" ? ALL_VIDEOS.length : ALL_VIDEOS.filter(v => v.category === cat.id).length;
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

  // 3. Render Story Bars, Thumbnails & Load Video
  renderStoryBars();
  renderUpNextStrip();
  loadCurrentVideo(autoPlay);
}

/**
 * Render Instagram Story Progress Bars at Top of Phone
 */
function renderStoryBars() {
  const bar = document.getElementById("storyProgressBar");
  if (!bar) return;

  const videos = getVideosInActiveCategory();
  if (videos.length <= 12) {
    bar.innerHTML = videos.map((_, index) => {
      let status = "";
      if (index < currentVideoIndexInCat) status = "viewed";
      else if (index === currentVideoIndexInCat) status = "active";
      return `<div class="story-segment ${status}" data-video-index="${index}"></div>`;
    }).join("");
  } else {
    // Continuous progress bar for "All 41 Reels" view
    const pct = Math.max(4, Math.round(((currentVideoIndexInCat + 1) / videos.length) * 100));
    bar.innerHTML = `<div class="story-continuous-fill" style="width: ${pct}%;"></div>`;
  }
}

/**
 * Render Visual "Up Next" Thumbnail Strip (Passes the Dad Test!)
 */
function renderUpNextStrip() {
  const strip = document.getElementById("upNextStrip");
  if (!strip) return;

  const videos = getVideosInActiveCategory();
  const activeCat = getActiveCategory();

  // Update header text based on active category
  const titleEl = document.getElementById("upNextTitle");
  if (titleEl) {
    if (activeCat.id === "all") {
      titleEl.textContent = `All 41 Client Reels (${videos.length})`;
    } else {
      titleEl.textContent = `${activeCat.icon} ${activeCat.name} (${videos.length})`;
    }
  }

  strip.innerHTML = videos.map((v, index) => {
    const isActive = index === currentVideoIndexInCat;
    const catObj = PORTFOLIO_CATEGORIES.find(c => c.id === v.category) || { icon: "🎬", name: "Reel" };
    const thumbUrl = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;

    return `
      <div class="up-next-card ${isActive ? 'active' : ''}" data-video-index="${index}" data-video-id="${v.id}" title="${escapeHtml(v.title)}">
        <img src="${thumbUrl}" alt="${escapeHtml(v.title)}" loading="lazy" />
        <div class="up-next-overlay">
          <span class="card-top-badge">${isActive ? '<i class="fa-solid fa-play"></i> NOW' : `#${index + 1}`}</span>
          <div class="card-bottom-info">
            <span class="card-cat-tag">${catObj.icon} ${v.client || catObj.name}</span>
            <span class="card-title-text">${escapeHtml(v.title)}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Attach tap event to each thumbnail
  strip.querySelectorAll(".up-next-card").forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-video-index"), 10);
      currentVideoIndexInCat = idx;
      loadCurrentVideo(true);
    });
  });

  scrollActiveThumbnailIntoView();
}

/**
 * Center the active thumbnail in the horizontal strip
 */
function scrollActiveThumbnailIntoView() {
  const strip = document.getElementById("upNextStrip");
  if (!strip) return;
  const activeCard = strip.querySelector(`.up-next-card[data-video-index="${currentVideoIndexInCat}"]`);
  if (activeCard) {
    activeCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }
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
  const catObj = PORTFOLIO_CATEGORIES.find(c => c.id === video.category) || activeCat;
  if (badgeIcon) badgeIcon.textContent = catObj.icon;
  if (badgeText) badgeText.textContent = video.tag || catObj.name;

  // 3. Update Video Screen (Clean YouTube Embed - 100% controls work natively!)
  const screen = document.getElementById("phoneScreen");
  if (screen) {
    if (autoPlay) {
      screen.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
          title="${escapeHtml(video.title)}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
          allowfullscreen>
        </iframe>
      `;
    } else {
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

      const previewBox = document.getElementById("phonePreviewBox");
      if (previewBox) {
        previewBox.addEventListener("click", () => {
          loadCurrentVideo(true);
        });
      }
    }
  }

  // 4. Update Video Metadata Card & Bottom Navigation Counter
  const clientTag = document.getElementById("reelClientTag");
  const title = document.getElementById("reelTitle");
  const desc = document.getElementById("reelDesc");
  const counter = document.getElementById("reelCounter");
  const whatsappBtn = document.getElementById("reelWhatsappBtn");
  const hintEl = document.getElementById("showcaseHint");

  if (clientTag) clientTag.textContent = `Client: ${video.client}`;
  if (title) title.textContent = video.title;
  if (desc) desc.textContent = video.description;
  
  if (counter) {
    counter.textContent = `${currentVideoIndexInCat + 1} of ${videosInCat.length}`;
  }

  if (hintEl) {
    hintEl.innerHTML = `
      <i class="fa-solid fa-play"></i> 
      <span>Tap <strong>Next Video</strong> or tap any thumbnail below • <strong>Reel ${currentVideoIndexInCat + 1} of ${videosInCat.length} in ${escapeHtml(activeCat.name)}</strong></span>
    `;
  }

  // 5. Update active thumbnail state in Up Next strip
  const strip = document.getElementById("upNextStrip");
  if (strip) {
    strip.querySelectorAll(".up-next-card").forEach(c => {
      const cIdx = parseInt(c.getAttribute("data-video-index"), 10);
      const isNowActive = cIdx === currentVideoIndexInCat;
      c.classList.toggle("active", isNowActive);
      const badge = c.querySelector(".card-top-badge");
      if (badge) {
        badge.innerHTML = isNowActive ? '<i class="fa-solid fa-play"></i> NOW' : `#${cIdx + 1}`;
      }
    });
    scrollActiveThumbnailIntoView();
  }

  // 6. Pre-fill WhatsApp CTA with this exact video title
  if (whatsappBtn) {
    const customMsg = `Hi Jay! I saw your portfolio video: "${video.title}" (${video.client}). I want a similar video for my business. Can we talk?`;
    whatsappBtn.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
  }
}

/**
 * Navigate to Next Video (Continuous cross-category playback)
 */
function nextVideo(autoPlay = true) {
  const videos = getVideosInActiveCategory();
  if (currentVideoIndexInCat < videos.length - 1) {
    currentVideoIndexInCat++;
    loadCurrentVideo(autoPlay);
  } else {
    // Seamless cross-category auto-advance:
    if (PORTFOLIO_CATEGORIES[currentCatIndex].id !== "all") {
      let nextCat = currentCatIndex + 1;
      if (nextCat >= PORTFOLIO_CATEGORIES.length) nextCat = 1; // loop back to first vertical
      switchCategory(nextCat, autoPlay);
    } else {
      currentVideoIndexInCat = 0;
      loadCurrentVideo(autoPlay);
    }
  }
}

/**
 * Navigate to Previous Video
 */
function prevVideo(autoPlay = true) {
  const videos = getVideosInActiveCategory();
  if (currentVideoIndexInCat > 0) {
    currentVideoIndexInCat--;
    loadCurrentVideo(autoPlay);
  } else {
    // Seamless cross-category reverse
    if (PORTFOLIO_CATEGORIES[currentCatIndex].id !== "all") {
      let prevCat = currentCatIndex - 1;
      if (prevCat < 1) prevCat = PORTFOLIO_CATEGORIES.length - 1;
      switchCategory(prevCat, autoPlay);
      currentVideoIndexInCat = getVideosInActiveCategory().length - 1;
      loadCurrentVideo(autoPlay);
    } else {
      currentVideoIndexInCat = videos.length - 1;
      loadCurrentVideo(autoPlay);
    }
  }
}

/**
 * Attach Event Listeners (Nav Buttons, Steppers, Keyboard)
 */
function attachShowcaseEvents() {
  // 1. Clean Navigation Bar Under Video
  const nextBtn = document.getElementById("nextReelBtn");
  const prevBtn = document.getElementById("prevReelBtn");
  if (nextBtn) nextBtn.addEventListener("click", () => nextVideo(true));
  if (prevBtn) prevBtn.addEventListener("click", () => prevVideo(true));

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

  // 3. Keyboard Arrow Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextVideo(true);
    if (e.key === "ArrowLeft") prevVideo(true);
    if (e.key === "ArrowUp") switchCategory(currentCatIndex - 1, false);
    if (e.key === "ArrowDown") switchCategory(currentCatIndex + 1, false);
  });
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
