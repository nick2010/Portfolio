/**
 * =========================================================================
 * JAYEDITS - COMPLETE 41-VIDEO PORTFOLIO DATA
 * =========================================================================
 */

const PORTFOLIO_CONFIG = {
  editorName: "Jay Edits",
  tagline: "High-Retention Short-Form Video Editor",
  whatsappNumber: "919662896697",
  whatsappDefaultMsg: "Hi Jay! I saw your video editor portfolio and I'd like to discuss videos for my business.",
  location: "Gujarat, India"
};

// 8 Categories (All Work + 7 Core Business Verticals)
const PORTFOLIO_CATEGORIES = [
  { id: "all", name: "All 41 Client Reels", shortName: "All 41 Reels", icon: "🎬" },
  { id: "luxury", name: "Luxury & Watches", shortName: "Luxury Items", icon: "✨" },
  { id: "fabrics", name: "Fabrics & Fashion", shortName: "Fabrics & Silk", icon: "👗" },
  { id: "auto", name: "Cars & Showrooms", shortName: "Cars & Auto", icon: "🚗" },
  { id: "factory", name: "Factory & Process", shortName: "Factory Process", icon: "🏭" },
  { id: "furniture", name: "Furniture & Interior", shortName: "Furniture & Decor", icon: "🛋️" },
  { id: "explainer", name: "Talking Head & Explainers", shortName: "Talking Head", icon: "🗣️" },
  { id: "lifestyle", name: "Lifestyle, Pets & Events", shortName: "Pets & Lifestyle", icon: "🐾" }
];

// All 41 Unlisted Client Videos
const ALL_VIDEOS = [
  // -------------------------------------------------------------------------
  // 1. LUXURY, WATCHES & JEWELRY (3 Videos)
  // -------------------------------------------------------------------------
  {
    id: 1,
    category: "luxury",
    title: "Cartier Santos Carrée Showcase",
    client: "Luxury Watch Collection",
    tag: "Luxury Timepiece",
    youtubeId: "_vAy2gVCWaY",
    description: "Macro reflections, elegant speed-curves, and gold-trimmed close-ups for high-end luxury timepieces."
  },
  {
    id: 2,
    category: "luxury",
    title: "Rolex Showcase Reel",
    client: "Watch Collector Showcase",
    tag: "High-End Luxury",
    youtubeId: "s8Km1fq4HiU",
    description: "Crisp lighting accents, sound-designed dial ticks, and luxury aesthetic framing."
  },
  {
    id: 3,
    category: "luxury",
    title: "Jewelry Shop Showcase",
    client: "Jewelry Boutique",
    tag: "Jewelry & Gold",
    youtubeId: "idNtN5a6qHQ",
    description: "Sparkle highlights and elegant slow-motion showcasing bridal jewelry and ornaments."
  },

  // -------------------------------------------------------------------------
  // 2. LUXURY FABRICS & FASHION SHOWROOM (8 Videos)
  // -------------------------------------------------------------------------
  {
    id: 4,
    category: "fabrics",
    title: "Fabrics Showroom Intro with VO & Captions",
    client: "Jalaram Fabrics",
    tag: "Showroom Voiceover",
    youtubeId: "PF0oT_QwygI",
    description: "Showroom walkthrough with engaging voiceover, dynamic captions, and texture close-ups."
  },
  {
    id: 5,
    category: "fabrics",
    title: "Pure Linen Fabric Showcase",
    client: "Textile Showroom",
    tag: "Premium Linen",
    youtubeId: "A4IZLaRZDks",
    description: "Highlighting breathable fabric weave, drape movement, and natural textures."
  },
  {
    id: 6,
    category: "fabrics",
    title: "Luxurious Fabric Showroom Tour",
    client: "Luxury Textile Boutique",
    tag: "Showroom Aesthetic",
    youtubeId: "YgdI5sw9TUA",
    description: "Speed-ramped camera motion gliding through rolls of luxury suitings and shirtings."
  },
  {
    id: 7,
    category: "fabrics",
    title: "Fabrics Showroom Highlight Reel",
    client: "Textile Boutique",
    tag: "Beat-Synced Reel",
    youtubeId: "rdM90Od0D-Y",
    description: "Beat-matched cuts and lighting transitions highlighting premium fashion fabrics."
  },
  {
    id: 8,
    category: "fabrics",
    title: "Fabrics Collection Showcase",
    client: "Textile Merchant",
    tag: "Fabric Collection",
    youtubeId: "BoMHh9XdD38",
    description: "Vibrant color grading and crisp camera focus highlighting festive fabric collections."
  },
  {
    id: 9,
    category: "fabrics",
    title: "Designer Fabric Showcase",
    client: "Fashion Showroom",
    tag: "Designer Wear",
    youtubeId: "ijBxooXbCE4",
    description: "Smooth panning shots and speed-ramps showcasing embroidery and premium weaves."
  },
  {
    id: 10,
    category: "fabrics",
    title: "Luxury Textile Showcase",
    client: "Textile Showroom",
    tag: "Luxury Retail",
    youtubeId: "1uwzvBPFVu4",
    description: "Modern retail reel with rhythmic music cuts and store ambience."
  },
  {
    id: 11,
    category: "fabrics",
    title: "Premium Fabric Showroom Showcase",
    client: "Luxury Fabrics",
    tag: "Showroom Highlights",
    youtubeId: "yGVLMdDLWQg",
    description: "Elegant store display tour designed to attract local foot traffic."
  },

  // -------------------------------------------------------------------------
  // 3. AUTOMOTIVE & CAR DELIVERIES (4 Videos)
  // -------------------------------------------------------------------------
  {
    id: 12,
    category: "auto",
    title: "Mercedes-Benz Luxury Delivery Day",
    client: "Mercedes-Benz Showroom",
    tag: "Luxury Delivery",
    youtubeId: "pNyfVw09yM4",
    description: "High-energy bass drops, cinematic car reveals, and celebratory customer delivery moments."
  },
  {
    id: 13,
    category: "auto",
    title: "Mercedes-Benz Delivery Celebration",
    client: "Luxury Auto Dealer",
    tag: "Car Delivery",
    youtubeId: "CBMlqM-C53E",
    description: "Emotional family celebration and car key handover with premium cinematic color grading."
  },
  {
    id: 14,
    category: "auto",
    title: "Hyundai Creta Delivery Reel",
    client: "Hyundai Showroom",
    tag: "SUV Delivery",
    youtubeId: "U3hxx2JWHa8",
    description: "Trendy whip-pan transitions and celebratory confetti shots for newly delivered Creta."
  },
  {
    id: 15,
    category: "auto",
    title: "Hyundai Venue Car Purchase",
    client: "Auto Dealership",
    tag: "Showroom Delivery",
    youtubeId: "EPuOAbalomU",
    description: "Fast-paced festive car delivery edit with trendy upbeat music beats."
  },

  // -------------------------------------------------------------------------
  // 4. FACTORY & MANUFACTURING BTS (7 Videos)
  // -------------------------------------------------------------------------
  {
    id: 16,
    category: "factory",
    title: "PVC Furniture Manufacturing Process",
    client: "Shiv PVC Furniture",
    tag: "Factory Machinery",
    youtubeId: "XDPuqR6vdP0",
    description: "Precision CNC cutting, edge banding, and sheet manufacturing synchronized to heavy rhythm."
  },
  {
    id: 17,
    category: "factory",
    title: "Chair Manufacturing & Assembly",
    client: "Parmar Chair Works",
    tag: "Chair Production",
    youtubeId: "h_rXe6F1cls",
    description: "Behind-the-scenes factory welding, cushion press molding, and ergonomic testing."
  },
  {
    id: 18,
    category: "factory",
    title: "Mattress Production & Manufacturing",
    client: "Sky Sleep Mattress",
    tag: "Factory Assembly",
    youtubeId: "Klj_bYkXq9A",
    description: "Industrial spring coiling, foam compression, and outer fabric quilting in action."
  },
  {
    id: 19,
    category: "factory",
    title: "Mattress Showroom Renovation Process",
    client: "Showroom Renovation",
    tag: "Transformation BTS",
    youtubeId: "uAsBT-kTR54",
    description: "Time-lapse and montage of raw construction turning into a luxury retail showroom."
  },
  {
    id: 20,
    category: "factory",
    title: "Baking Shop Manufacturing Process Demo",
    client: "Bakery / Food",
    tag: "Food Production",
    youtubeId: "huWFSY2DUQw",
    description: "Hypnotic baking process: dough kneading, oven baking, and dessert finishing."
  },
  {
    id: 21,
    category: "factory",
    title: "Mattress Showroom Renovation Reveal",
    client: "Retail Showroom",
    tag: "Renovation Reveal",
    youtubeId: "Gh1mV6Dqrbo",
    description: "Before-and-after walkthrough of renovated showroom lighting and display areas."
  },
  {
    id: 22,
    category: "factory",
    title: "PVC Furniture Before / After Transformation",
    client: "Interior Works",
    tag: "Before & After",
    youtubeId: "kflYV4sVBd8",
    description: "Dramatic transition from empty cement room to fully furnished waterproof PVC interior."
  },

  // -------------------------------------------------------------------------
  // 5. FURNITURE & MATTRESS SHOWCASES (11 Videos)
  // -------------------------------------------------------------------------
  {
    id: 23,
    category: "furniture",
    title: "Customer Feedback & Furniture Showcase",
    client: "Shiv PVC Furniture",
    tag: "Client Review",
    youtubeId: "I5-iifhpJRo",
    description: "Real customer review testimonial blended with cinematic shots of completed home furniture."
  },
  {
    id: 24,
    category: "furniture",
    title: "PVC Modular Furniture Showcase",
    client: "Shiv PVC Furniture",
    tag: "Modular Furniture",
    youtubeId: "8KiyWLyCOgI",
    description: "Glossy laminate finishes, soft-close drawers, and modern bedroom wardrobe showcases."
  },
  {
    id: 25,
    category: "furniture",
    title: "Sofa Chair Showroom Showcase",
    client: "Furniture Gallery",
    tag: "Living Room",
    youtubeId: "rgDJJik5leA",
    description: "Comfort testing, velvet upholstery detail, and living room aesthetic styling."
  },
  {
    id: 26,
    category: "furniture",
    title: "Luxury Lounge Chair Showcase",
    client: "Design Furniture",
    tag: "Luxury Accent",
    youtubeId: "7wtiiQyY7Rk",
    description: "Smooth 360-degree rotational shots highlighting luxury armchair craftsmanship."
  },
  {
    id: 27,
    category: "furniture",
    title: "Luxury Sofa Chair Showcase",
    client: "Furniture Studio",
    tag: "Sofa Showcase",
    youtubeId: "7Uaw7Q5eky0",
    description: "Speed-ramping through premium sofa finishes, cushioning, and stitching."
  },
  {
    id: 28,
    category: "furniture",
    title: "Complete Home Furniture Showcase",
    client: "Interior Studio",
    tag: "Full Interior",
    youtubeId: "ItOTGRZMjjc",
    description: "Walkthrough of custom TV units, wardrobes, modular kitchen, and ceilings."
  },
  {
    id: 29,
    category: "furniture",
    title: "Mattress Orthopedic Product Intro",
    client: "Sky Sleep Mattress",
    tag: "Product Intro",
    youtubeId: "g6FZCV7T-Pg",
    description: "Clean product showcase highlighting spine support, cooling gel, and firmness layers."
  },
  {
    id: 30,
    category: "furniture",
    title: "Mattress Comfort & Softness Intro",
    client: "Sky Sleep Mattress",
    tag: "Product Showcase",
    youtubeId: "k3q5y0ciC88",
    description: "Slow-motion bounce tests and fabric texture zooms demonstrating plush comfort."
  },
  {
    id: 31,
    category: "furniture",
    title: "Mattress Catalog Product Intro",
    client: "Sky Sleep Mattress",
    tag: "Product Feature",
    youtubeId: "QjYAz2JH7TM",
    description: "Kinetic text animations and benefit callouts engineered for commercial ads."
  },
  {
    id: 32,
    category: "furniture",
    title: "Premium Mattress Range Showcase",
    client: "Mattress Showroom",
    tag: "Showroom Range",
    youtubeId: "nd4F-fLEDpE",
    description: "Side-by-side comparison of dual-comfort and memory foam mattress models."
  },
  {
    id: 33,
    category: "furniture",
    title: "Luxury Mattress Collection Showcase",
    client: "Mattress Brand",
    tag: "Luxury Sleep",
    youtubeId: "hPQQ1qioWYU",
    description: "Aesthetic lifestyle framing showing sleep comfort and luxury bedroom setups."
  },

  // -------------------------------------------------------------------------
  // 6. TALKING HEAD & EXPLAINERS (3 Videos)
  // -------------------------------------------------------------------------
  {
    id: 34,
    category: "explainer",
    title: "PVC Furniture Waterproof Explainer",
    client: "Shiv PVC Furniture",
    tag: "Founder Explainer",
    youtubeId: "J6hu3ZmVd30",
    description: "Owner explaining 100% termite-proof & waterproof benefits with animated bullet captions."
  },
  {
    id: 35,
    category: "explainer",
    title: "Furniture Founder Explainer (Talking Head)",
    client: "Furniture Manufacturer",
    tag: "Talking Head",
    youtubeId: "5D-DidCaOxw",
    description: "High-retention talking-head format with zoom punch-ins, Gujarati/Hindi subtitles & B-roll."
  },
  {
    id: 36,
    category: "explainer",
    title: "PVC Material Breakdown Explainer",
    client: "Interior Manufacturer",
    tag: "Material Explainer",
    youtubeId: "aEx_oCeGoQQ",
    description: "Educational comparison showing why PVC outlasts traditional plywood in humid climates."
  },

  // -------------------------------------------------------------------------
  // 7. LIFESTYLE, PETS & EVENTS (5 Videos)
  // -------------------------------------------------------------------------
  {
    id: 37,
    category: "lifestyle",
    title: "Pet Grooming Spa - Full Pampering Reel",
    client: "Paws & Bubbles Spa",
    tag: "Pet Care Service",
    youtubeId: "1WZ9oOdEbvU",
    description: "Upbeat music sync of dog bathing, shampooing, blow drying, and cute reactions."
  },
  {
    id: 38,
    category: "lifestyle",
    title: "Pet Grooming Spa - Haircut & Styling",
    client: "Pet Spa Boutique",
    tag: "Pet Grooming",
    youtubeId: "BXEcODjdY0Q",
    description: "Rhythmic scissors snips, nail trimming, and final adorable bandana reveal."
  },
  {
    id: 39,
    category: "lifestyle",
    title: "Pet Grooming Spa - Bubble Bath Highlights",
    client: "Dog Spa Clinic",
    tag: "Pet Care",
    youtubeId: "SmPVvMEDQ5E",
    description: "High-retention wholesome reel engineered to drive local pet parent appointments."
  },
  {
    id: 40,
    category: "lifestyle",
    title: "Navratri Festival & Birthday Celebration",
    client: "Event Celebration",
    tag: "Festival & Event",
    youtubeId: "lQ_BqJ4cWVI",
    description: "Vibrant Garba dance beats, traditional attire color grading, and festive family highlights."
  },
  {
    id: 41,
    category: "lifestyle",
    title: "Viral Instagram Trend Edit",
    client: "Social Media Trend",
    tag: "Viral Trend",
    youtubeId: "2TIWfAVVKM0",
    description: "Algorithm-optimized beat cuts and trending sound effects designed for maximum viral reach."
  }
];
