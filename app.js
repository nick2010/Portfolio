/**
 * =========================================================================
 * JAYEDITS - PEEK-AHEAD SWIPABLE REEL DECK & THUMB DOCK CONTROLLER
 * Seamless Horizontal Reel Deck, Chapter Transitions & Category Drawer
 * =========================================================================
 */

let allDeckCards = [];
let activeCardIndex = 0;
let activePlayingCard = null;
let isScrollThrottled = false;

document.addEventListener("DOMContentLoaded", () => {
  initPortfolioApp();
});

function initPortfolioApp() {
  initWhatsAppLinks();
  buildDeckCardData();
  initDeckShowcase();
  initCatDrawer();
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
  setHref("pricingCard2Btn", "Hi Jay! I'm interested in the Monthly Pack (4 to 10 reels/month). What are the package rates?");
  setHref("pricingCard3Btn", "Hi Jay! I want to discuss a custom factory tour / commercial video editing project.");
}

/**
 * Build complete sequence of 41 video cards + 6 chapter transition cards
 */
function buildDeckCardData() {
  allDeckCards = [];
  const verticalCats = PORTFOLIO_CATEGORIES.filter(c => c.id !== "all");

  verticalCats.forEach((cat, catIndex) => {
    const catVideos = ALL_VIDEOS.filter(v => v.category === cat.id);

    // Concept 4: Chapter Transition Card between categories (starting from 2nd category)
    if (catIndex > 0) {
      allDeckCards.push({
        type: "chapter",
        category: cat,
        videoCount: catVideos.length
      });
    }

    // Video cards for this category
    catVideos.forEach((v, vIndex) => {
      allDeckCards.push({
        type: "video",
        video: v,
        category: cat,
        indexInCat: vIndex,
        totalInCat: catVideos.length
      });
    });
  });
}

/**
 * Initialize Peek-Ahead Swipable Deck Showcase
 */
function initDeckShowcase() {
  renderDeckTrack();
  attachDeckEvents();
  setActiveCard(0, false);
}

/**
 * Render all 47 cards in the horizontal scroll-snap deck
 */
function renderDeckTrack() {
  const track = document.getElementById("reelDeckTrack");
  if (!track) return;

  track.innerHTML = allDeckCards.map((item, index) => {
    if (item.type === "chapter") {
      return `
        <div class="chapter-card ${index === 0 ? 'active' : ''}" data-deck-index="${index}" data-cat-id="${item.category.id}">
          <div class="chapter-icon-halo">${item.category.icon}</div>
          <span class="chapter-eyebrow">UP NEXT</span>
          <h3 class="chapter-title">${escapeHtml(item.category.name)}</h3>
          <span class="chapter-count">${item.videoCount} Client Reels</span>
          <button class="chapter-action-btn" type="button">
            <span>Explore Category</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
    }

    return `
      <div class="reel-card ${index === 0 ? 'active' : ''}" data-deck-index="${index}" data-video-id="${item.video.id}" data-cat-id="${item.category.id}">
        ${renderVideoCardInner(item)}
      </div>
    `;
  }).join("");
}

/**
 * Render inner content of a video card (Thumbnail + overlays)
 */
function renderVideoCardInner(item) {
  const thumbUrl = `https://img.youtube.com/vi/${item.video.youtubeId}/hqdefault.jpg`;
  
  // Render story progress bars at top of card
  let storyBarsHtml = "";
  if (item.totalInCat <= 12) {
    const segments = [];
    for (let i = 0; i < item.totalInCat; i++) {
      let status = "";
      if (i < item.indexInCat) status = "viewed";
      else if (i === item.indexInCat) status = "active";
      segments.push(`<div class="reel-card-segment ${status}"></div>`);
    }
    storyBarsHtml = `<div class="reel-card-story">${segments.join("")}</div>`;
  }

  return `
    <img class="reel-card-thumb" src="${thumbUrl}" alt="${escapeHtml(item.video.title)}" loading="lazy" />
    ${storyBarsHtml}
    <div class="reel-card-badge">
      <span>${item.category.icon}</span>
      <span>${escapeHtml(item.video.tag || item.category.name)}</span>
    </div>
    <div class="reel-card-overlay">
      <div class="reel-card-play-btn" title="Play Video with sound">
        <i class="fa-solid fa-play"></i>
      </div>
    </div>
  `;
}

/**
 * Set active card by deck index and update dock + info card
 */
function setActiveCard(newIndex, scrollIntoView = true) {
  if (newIndex < 0 || newIndex >= allDeckCards.length) return;

  const track = document.getElementById("reelDeckTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".reel-card, .chapter-card");
  const previousCard = cards[activeCardIndex];
  const targetCard = cards[newIndex];

  // If previous card was playing video, restore its thumbnail preview
  if (previousCard && previousCard !== targetCard && activePlayingCard === previousCard) {
    restoreCardThumbnail(previousCard);
  }

  activeCardIndex = newIndex;

  // Update card active classes
  cards.forEach((card, idx) => {
    card.classList.toggle("active", idx === activeCardIndex);
  });

  if (scrollIntoView && targetCard) {
    targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  // Update Thumb-Zone Dock & Details
  const currentItem = allDeckCards[activeCardIndex];
  if (!currentItem) return;

  const dockCatIcon = document.getElementById("dockCatIcon");
  const dockCatText = document.getElementById("dockCatText");
  const dockCatCount = document.getElementById("dockCatCount");

  const clientTag = document.getElementById("deckClientTag");
  const title = document.getElementById("deckReelTitle");
  const desc = document.getElementById("deckReelDesc");
  const whatsappBtn = document.getElementById("deckWhatsappBtn");

  if (currentItem.type === "video") {
    if (dockCatIcon) dockCatIcon.textContent = currentItem.category.icon;
    if (dockCatText) dockCatText.textContent = currentItem.category.shortName || currentItem.category.name;
    if (dockCatCount) dockCatCount.textContent = `${currentItem.indexInCat + 1}/${currentItem.totalInCat}`;

    if (clientTag) clientTag.textContent = `Client: ${currentItem.video.client}`;
    if (title) title.textContent = currentItem.video.title;
    if (desc) desc.textContent = currentItem.video.description;

    if (whatsappBtn) {
      const customMsg = `Hi Jay! I saw your portfolio reel: "${currentItem.video.title}" (${currentItem.video.client}). I want a similar video for my business. Can we talk?`;
      whatsappBtn.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
    }
  } else if (currentItem.type === "chapter") {
    if (dockCatIcon) dockCatIcon.textContent = currentItem.category.icon;
    if (dockCatText) dockCatText.textContent = `Up Next: ${currentItem.category.shortName || currentItem.category.name}`;
    if (dockCatCount) dockCatCount.textContent = `${currentItem.videoCount} Reels`;

    if (clientTag) clientTag.textContent = "Industry Showcase";
    if (title) title.textContent = currentItem.category.name;
    if (desc) desc.textContent = `Swipe or tap to explore ${currentItem.videoCount} real client reels in ${currentItem.category.name}.`;

    if (whatsappBtn) {
      const customMsg = `Hi Jay! I'm interested in video editing for ${currentItem.category.name}. Can we discuss pricing?`;
      whatsappBtn.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
    }
  }

  // Highlight active category in the bottom drawer
  updateActiveDrawerCard(currentItem.category.id);
}

/**
 * Dismiss the first-visit floating micro-cue
 */
function dismissDockCue() {
  const cue = document.getElementById("dockCueWrapper");
  if (cue && !cue.classList.contains("dismissed")) {
    cue.classList.add("dismissed");
    setTimeout(() => {
      if (cue.parentNode) cue.parentNode.removeChild(cue);
    }, 450);
  }
}

/**
 * Play video inside active card
 */
function playVideoInCard(cardEl, video) {
  dismissDockCue();
  if (activePlayingCard && activePlayingCard !== cardEl) {
    restoreCardThumbnail(activePlayingCard);
  }

  activePlayingCard = cardEl;
  cardEl.innerHTML = `
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
      title="${escapeHtml(video.title)}" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
      allowfullscreen>
    </iframe>
  `;
}

/**
 * Restore card to its static thumbnail preview
 */
function restoreCardThumbnail(cardEl) {
  const idx = parseInt(cardEl.getAttribute("data-deck-index"), 10);
  const item = allDeckCards[idx];
  if (!item || item.type !== "video") return;

  cardEl.innerHTML = renderVideoCardInner(item);
  if (activePlayingCard === cardEl) {
    activePlayingCard = null;
  }
}

/**
 * Attach events for Carousel, Dock buttons & Keyboard
 */
function attachDeckEvents() {
  const track = document.getElementById("reelDeckTrack");
  if (!track) return;

  // 1. Scroll-snap listener with requestAnimationFrame
  track.addEventListener("scroll", () => {
    dismissDockCue();
    if (!isScrollThrottled) {
      isScrollThrottled = true;
      requestAnimationFrame(() => {
        onDeckScroll();
        isScrollThrottled = false;
      });
    }
  }, { passive: true });

  // 2. Click events on cards
  track.addEventListener("click", (e) => {
    dismissDockCue();
    const cardEl = e.target.closest(".reel-card, .chapter-card");
    if (!cardEl) return;

    const idx = parseInt(cardEl.getAttribute("data-deck-index"), 10);
    const item = allDeckCards[idx];
    if (!item) return;

    if (item.type === "video") {
      if (idx === activeCardIndex) {
        // Tapped centered active card -> play video!
        playVideoInCard(cardEl, item.video);
      } else {
        // Tapped peeking card -> scroll it into center!
        setActiveCard(idx, true);
      }
    } else if (item.type === "chapter") {
      // Tapped chapter card -> advance to next card (the first video of chapter)
      setActiveCard(idx + 1, true);
    }
  });

  // 3. Floating Micro-Cue Click
  const dockTapCue = document.getElementById("dockTapCue");
  if (dockTapCue) {
    dockTapCue.addEventListener("click", () => {
      dismissDockCue();
      toggleCatDrawer(true);
    });
  }

  // 4. Thumb-Zone Dock Previous / Next Industry
  const dockPrevBtn = document.getElementById("dockPrevBtn");
  const dockNextBtn = document.getElementById("dockNextBtn");
  const dockCatTrigger = document.getElementById("dockCatTrigger");

  if (dockPrevBtn) {
    dockPrevBtn.addEventListener("click", () => {
      dismissDockCue();
      jumpToAdjacentCategory(-1);
    });
  }

  if (dockNextBtn) {
    dockNextBtn.addEventListener("click", () => {
      dismissDockCue();
      jumpToAdjacentCategory(1);
    });
  }

  if (dockCatTrigger) {
    dockCatTrigger.addEventListener("click", () => {
      dismissDockCue();
      toggleCatDrawer(true);
    });
  }

  // 4. Keyboard Arrow Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      if (activeCardIndex < allDeckCards.length - 1) setActiveCard(activeCardIndex + 1, true);
    } else if (e.key === "ArrowLeft") {
      if (activeCardIndex > 0) setActiveCard(activeCardIndex - 1, true);
    } else if (e.key === "ArrowUp") {
      jumpToAdjacentCategory(-1);
    } else if (e.key === "ArrowDown") {
      jumpToAdjacentCategory(1);
    } else if (e.key === "Escape") {
      toggleCatDrawer(false);
    }
  });
}

/**
 * Detect centered card on scroll
 */
function onDeckScroll() {
  const track = document.getElementById("reelDeckTrack");
  if (!track) return;

  const trackCenter = track.scrollLeft + track.offsetWidth / 2;
  const cards = track.querySelectorAll(".reel-card, .chapter-card");

  let closestIndex = activeCardIndex;
  let minDiff = Infinity;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const diff = Math.abs(trackCenter - cardCenter);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = parseInt(card.getAttribute("data-deck-index"), 10);
    }
  });

  if (closestIndex !== activeCardIndex) {
    setActiveCard(closestIndex, false);
  }
}

/**
 * Jump to previous or next business industry
 */
function jumpToAdjacentCategory(direction) {
  const verticalCats = PORTFOLIO_CATEGORIES.filter(c => c.id !== "all");
  const currentItem = allDeckCards[activeCardIndex];
  if (!currentItem) return;

  const currentCatId = currentItem.category.id;
  const currentCatIdx = verticalCats.findIndex(c => c.id === currentCatId);
  let nextCatIdx = currentCatIdx + direction;

  if (nextCatIdx < 0) nextCatIdx = verticalCats.length - 1;
  if (nextCatIdx >= verticalCats.length) nextCatIdx = 0;

  const targetCat = verticalCats[nextCatIdx];
  jumpToCategory(targetCat.id);
}

/**
 * Jump directly to a specific category
 */
function jumpToCategory(categoryId) {
  if (categoryId === "all") {
    setActiveCard(0, true);
    return;
  }

  // Find the first video card belonging to this category
  const targetIndex = allDeckCards.findIndex(item => item.type === "video" && item.category.id === categoryId);
  if (targetIndex !== -1) {
    setActiveCard(targetIndex, true);
  }
}

/**
 * Initialize Category Bottom Drawer
 */
function initCatDrawer() {
  const grid = document.getElementById("catDrawerGrid");
  const backdrop = document.getElementById("catDrawerBackdrop");
  const closeBtn = document.getElementById("catDrawerClose");

  if (!grid) return;

  // 1. Featured "All 41 Client Reels" card
  const allReelsHtml = `
    <div class="cat-drawer-card cat-drawer-card-featured" data-cat-id="all">
      <div class="cat-drawer-card-left">
        <span class="cat-drawer-card-icon">🎬</span>
        <div>
          <div class="cat-drawer-card-name">All 41 Client Reels</div>
          <div style="font-size: 0.72rem; opacity: 0.8;">Continuous stream across 7 industries</div>
        </div>
      </div>
      <span class="cat-drawer-card-count">41</span>
    </div>
  `;

  // 2. Specific industry cards
  const verticalCats = PORTFOLIO_CATEGORIES.filter(c => c.id !== "all");
  const catCardsHtml = verticalCats.map(cat => {
    const count = ALL_VIDEOS.filter(v => v.category === cat.id).length;
    return `
      <div class="cat-drawer-card" data-cat-id="${cat.id}">
        <div class="cat-drawer-card-left">
          <span class="cat-drawer-card-icon">${cat.icon}</span>
          <span class="cat-drawer-card-name">${escapeHtml(cat.name)}</span>
        </div>
        <span class="cat-drawer-card-count">${count}</span>
      </div>
    `;
  }).join("");

  grid.innerHTML = allReelsHtml + catCardsHtml;

  // Card clicks in drawer
  grid.querySelectorAll(".cat-drawer-card").forEach(card => {
    card.addEventListener("click", () => {
      const catId = card.getAttribute("data-cat-id");
      jumpToCategory(catId);
      toggleCatDrawer(false);
    });
  });

  if (backdrop) backdrop.addEventListener("click", () => toggleCatDrawer(false));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleCatDrawer(false));
}

/**
 * Toggle open/close state of Category Bottom Drawer
 */
function toggleCatDrawer(open) {
  const drawer = document.getElementById("catDrawer");
  const backdrop = document.getElementById("catDrawerBackdrop");
  const indicator = document.querySelector(".dock-arrow-indicator");

  if (drawer && backdrop) {
    drawer.classList.toggle("active", open);
    backdrop.classList.toggle("active", open);
    drawer.setAttribute("aria-hidden", !open);
    if (indicator) {
      indicator.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
    }
  }
}

/**
 * Highlight active category inside bottom drawer
 */
function updateActiveDrawerCard(activeCatId) {
  const grid = document.getElementById("catDrawerGrid");
  if (!grid) return;
  grid.querySelectorAll(".cat-drawer-card").forEach(card => {
    const cId = card.getAttribute("data-cat-id");
    card.classList.toggle("active", cId === activeCatId);
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
