/**
 * =========================================================================
 * YOUR PORTFOLIO CONTENT & SETTINGS
 * =========================================================================
 * To update your phone number, name, or videos, just edit this file!
 * You DO NOT need to touch HTML or CSS code.
 */

const PORTFOLIO_CONFIG = {
  // Your details (Replace with your real details)
  editorName: "Creative Edits",
  tagline: "High-Retention Video Editor",
  
  // Your WhatsApp Number (Include country code without '+' or '-' e.g., '919876543210')
  whatsappNumber: "919876543210",
  
  // Default WhatsApp message that opens when a client clicks "Let's Talk"
  whatsappDefaultMsg: "Hi! I saw your video editor portfolio and I'm interested in discussing videos for my business.",
  
  // Optional socials
  instagramHandle: "your.instagram.handle",
  emailAddress: "contact@youredits.com",
  location: "Gujarat, India"
};

// The categories your clients can filter by
const CATEGORIES = [
  { id: "all", name: "All Videos", icon: "fa-solid fa-shapes" },
  { id: "factory", name: "Factory & Process", icon: "fa-solid fa-industry" },
  { id: "showroom", name: "Showroom & Luxury", icon: "fa-solid fa-gem" },
  { id: "explainer", name: "Explainers & Captions", icon: "fa-solid fa-closed-captioning" },
  { id: "lifestyle", name: "Services & Lifestyle", icon: "fa-solid fa-paw" },
  { id: "motion", name: "Motion Graphics & Ads", icon: "fa-solid fa-layer-group" }
];

/**
 * YOUR VIDEOS LIST
 * To add a new video:
 * 1. Upload your vertical video as an "Unlisted" YouTube video or YouTube Short.
 * 2. Copy the video ID from the link (e.g. if the link is youtube.com/shorts/dQw4w9WgXcQ, the ID is 'dQw4w9WgXcQ').
 * 3. Add an entry below!
 */
const VIDEOS_DATA = [
  {
    id: 1,
    title: "Shiv PVC Furniture - Factory Process & Beat Cuts",
    client: "Shiv PVC Furniture",
    category: "factory",
    tag: "Beat-Synced",
    // Clean demo sample video (can be replaced with your unlisted YouTube ID)
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
    description: "Dynamic beat-synced cuts showcasing raw PVC materials, cutting machinery, and seamless assembly into luxury modular furniture."
  },
  {
    id: 2,
    title: "Jalaram Fabrics - Luxury Clothing Showroom Showcase",
    client: "Jalaram Fabrics",
    category: "showroom",
    tag: "Luxury / Retail",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80",
    description: "Cinematic camera movement and speed-ramping highlighting fabric textures, grand showroom lighting, and premium clothing collections."
  },
  {
    id: 3,
    title: "Founder Explainer: Waterproof PVC Secrets (Captions)",
    client: "Shiv PVC Furniture",
    category: "explainer",
    tag: "Talking Head",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80",
    description: "YouTube-style edutainment edit with stylized Gujarati & Hindi subtitles, subtle zoom punch-ins, B-roll cutaways, and sound effects."
  },
  {
    id: 4,
    title: "Parmar Chairs - Manufacturing Behind-the-Scenes",
    client: "Parmar Chair Works",
    category: "factory",
    tag: "Factory BTS",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=80",
    description: "Fast-paced rhythmic montage showcasing welding, cushion molding, and ergonomic office chair testing."
  },
  {
    id: 5,
    title: "Mercedes Delivery Day - High Energy Trendy Reel",
    client: "Auto Showroom",
    category: "showroom",
    tag: "Automotive",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    description: "Celebratory car delivery edit with trendy bass drops, camera whip-pans, and emotional family moments."
  },
  {
    id: 6,
    title: "Dog Spa Grooming - Pampering Experience",
    client: "Paws & Bubbles Spa",
    category: "lifestyle",
    tag: "Pet Care",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80",
    description: "Wholesome, high-retention reel of dog washing, blow-drying, and styling set to upbeat cheerful rhythm."
  },
  {
    id: 7,
    title: "Doctor Health Advice - High-Retention Subtitles",
    client: "Medical Clinic",
    category: "explainer",
    tag: "Educational",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
    description: "Fast-paced medical explainer with bold word-by-word animated captions, medical diagrams, and retention sound design."
  },
  {
    id: 8,
    title: "Sky Sleep Mattress - Motion Graphics Product Ad",
    client: "Sky Sleep Mattress",
    category: "motion",
    tag: "Motion Graphics",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    description: "Created entirely from raw catalog photos: animated layer separation, orthopedic layer breakdown, typography, and punchy transitions."
  },
  {
    id: 9,
    title: "Sky Sleep - Hypnotic Mattress Manufacturing Process",
    client: "Sky Sleep Factory",
    category: "factory",
    tag: "Process Video",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    description: "Spring coiling, foam compression, and industrial fabric stitching synchronized to rhythmic percussion."
  },
  {
    id: 10,
    title: "Griha Pravesh - New House Pooja Cinematic",
    client: "Family Event",
    category: "lifestyle",
    tag: "Event & Ritual",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&auto=format&fit=crop&q=80",
    description: "Warm color grading, slow-motion traditional pooja highlights, and aesthetic home tour transitions."
  },
  {
    id: 11,
    title: "Jewelry & Ethnic Wear - Festive Collection",
    client: "Heritage Boutique",
    category: "showroom",
    tag: "Jewelry & Gold",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80",
    description: "Macro sparkle zooms, elegant speed-curves, and gold reflection grading for festival marketing."
  },
  {
    id: 12,
    title: "Long-form Podcast Repurposing to Viral Short",
    client: "Creator Channel",
    category: "explainer",
    tag: "Repurposing",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80",
    description: "Extracting a 45-second golden insight from a 1-hour interview: dual-speaker tracking, kinetic text, and background ambient music."
  }
];
