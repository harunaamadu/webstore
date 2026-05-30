import type { Product } from "@/types";

export const mockProducts: Product[] = [
  // ── Electronics ──────────────────────────────────────────────────────────
  {
    id: "prod-001",
    name: "Apple AirPods Pro (2nd Generation)",
    brand: "Apple",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop",
    price: 189.0,
    originalPrice: 249.0,
    discountPercent: 24,
    review: { rating: 4.8, count: 38200 },
    badge: "best-seller",
    description:
      "Active noise cancellation, Adaptive Transparency, Personalized Spatial Audio with dynamic head tracking.",
    tags: ["wireless", "noise-cancelling", "apple", "earbuds"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 120000,
    variants: [
      { label: "White", value: "white", inStock: true },
      { label: "Midnight", value: "midnight", inStock: false },
    ],
  },
  {
    id: "prod-002",
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop",
    price: 999.0,
    originalPrice: 1299.0,
    discountPercent: 23,
    review: { rating: 4.7, count: 12400 },
    badge: "hot",
    description:
      "200MP ProVisual Engine camera, 5000mAh battery, S Pen included, titanium frame.",
    tags: ["5g", "android", "samsung", "smartphone"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 1,
    sold: 45000,
    variants: [
      { label: "Titanium Black", value: "black", inStock: true },
      { label: "Titanium Gray", value: "gray", inStock: true },
      { label: "Titanium Violet", value: "violet", inStock: false },
    ],
  },
  {
    id: "prod-003",
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    price: 279.0,
    originalPrice: 399.0,
    discountPercent: 30,
    review: { rating: 4.9, count: 29100 },
    badge: "best-seller",
    description:
      "Industry-leading noise cancelling with Auto NC Optimizer, up to 30-hour battery.",
    tags: ["headphones", "noise-cancelling", "sony", "wireless"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 89000,
  },
  {
    id: "prod-004",
    name: 'LG 27" 4K UHD Monitor IPS',
    brand: "LG",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
    price: 349.0,
    originalPrice: 429.0,
    discountPercent: 19,
    review: { rating: 4.6, count: 8700 },
    badge: "sale",
    description:
      "4K UHD (3840x2160) IPS Display, HDR10, AMD FreeSync, USB-C 60W Power Delivery.",
    tags: ["monitor", "4k", "ips", "lg", "hdr"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 3,
    sold: 22000,
  },

  // ── Fashion ───────────────────────────────────────────────────────────────
  {
    id: "prod-005",
    name: "Nike Air Max 270 React",
    brand: "Nike",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    price: 110.0,
    originalPrice: 150.0,
    discountPercent: 27,
    review: { rating: 4.5, count: 18600 },
    badge: "sale",
    description:
      "Max Air unit delivers unrivaled, all-day comfort. React foam midsole for lightweight cushioning.",
    tags: ["nike", "running", "sneakers", "air-max"],
    inStock: true,
    freeShipping: false,
    deliveryDays: 4,
    sold: 67000,
    variants: [
      { label: "US 8", value: "8", inStock: true },
      { label: "US 9", value: "9", inStock: true },
      { label: "US 10", value: "10", inStock: false },
      { label: "US 11", value: "11", inStock: true },
    ],
  },
  {
    id: "prod-006",
    name: "Levi's 501 Original Fit Jeans",
    brand: "Levi's",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    price: 69.5,
    originalPrice: 89.5,
    discountPercent: 22,
    review: { rating: 4.4, count: 43100 },
    description:
      "The original blue jean since 1873. Straight fit, button fly, signature Levi's styling.",
    tags: ["jeans", "denim", "levis", "classic"],
    inStock: true,
    freeShipping: false,
    deliveryDays: 5,
    sold: 180000,
  },
  {
    id: "prod-007",
    name: "Fjällräven Kånken Backpack",
    brand: "Fjällräven",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    price: 89.95,
    review: { rating: 4.7, count: 9800 },
    badge: "new",
    description:
      "Iconic Swedish backpack. Vinylon F fabric, 16L capacity, padded shoulder straps.",
    tags: ["backpack", "swedish", "school", "travel"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 3,
    sold: 31000,
    variants: [
      { label: "Forest Green", value: "green", inStock: true },
      { label: "Navy", value: "navy", inStock: true },
      { label: "Red", value: "red", inStock: false },
    ],
  },

  // ── Home ──────────────────────────────────────────────────────────────────
  {
    id: "prod-008",
    name: "Dyson V15 Detect Absolute",
    brand: "Dyson",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    price: 649.0,
    originalPrice: 749.0,
    discountPercent: 13,
    review: { rating: 4.8, count: 6300 },
    badge: "best-seller",
    description:
      "Laser Slim Fluffy head reveals hidden dust. HEPA filtration. Up to 60 min run time.",
    tags: ["vacuum", "cordless", "dyson", "cleaning"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 14000,
  },
  {
    id: "prod-009",
    name: "Instant Pot Duo 7-in-1",
    brand: "Instant Pot",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=800&auto=format&fit=crop",
    price: 79.95,
    originalPrice: 99.95,
    discountPercent: 20,
    review: { rating: 4.7, count: 157000 },
    badge: "best-seller",
    description:
      "Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer.",
    tags: ["kitchen", "pressure-cooker", "instant-pot", "cooking"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 510000,
  },
  {
    id: "prod-010",
    name: "Philips Hue Smart Bulb Starter Kit",
    brand: "Philips",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop",
    price: 79.99,
    originalPrice: 99.99,
    discountPercent: 20,
    review: { rating: 4.5, count: 22100 },
    description:
      "16 million colors, works with Alexa, Google Assistant & Apple HomeKit. 3-pack + bridge.",
    tags: ["smart-home", "lighting", "philips", "alexa"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 3,
    sold: 78000,
  },

  // ── Beauty ────────────────────────────────────────────────────────────────
  {
    id: "prod-011",
    name: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    price: 16.08,
    originalPrice: 22.0,
    discountPercent: 27,
    review: { rating: 4.8, count: 212000 },
    badge: "best-seller",
    description:
      "Daily face & body moisturizer with hyaluronic acid and 3 essential ceramides.",
    tags: ["skincare", "moisturizer", "hyaluronic", "ceramide"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 800000,
  },
  {
    id: "prod-012",
    name: "Dyson Airwrap Multi-Styler",
    brand: "Dyson",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    price: 499.99,
    review: { rating: 4.6, count: 7400 },
    badge: "hot",
    description:
      "Styles and dries simultaneously with no extreme heat. Coanda effect to attract and style hair.",
    tags: ["dyson", "hair-styling", "curler", "beauty"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 19000,
  },

  // ── Sports ────────────────────────────────────────────────────────────────
  {
    id: "prod-013",
    name: "Garmin Forerunner 255 GPS Watch",
    brand: "Garmin",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    price: 299.99,
    originalPrice: 349.99,
    discountPercent: 14,
    review: { rating: 4.7, count: 5200 },
    badge: "new",
    description:
      "Advanced running metrics, race predictor, recovery advisor, multi-band GPS.",
    tags: ["running", "gps", "garmin", "smartwatch"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 3,
    sold: 12000,
  },
  {
    id: "prod-014",
    name: "Hydro Flask 32 oz Wide Mouth",
    brand: "Hydro Flask",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
    price: 44.95,
    review: { rating: 4.8, count: 34700 },
    description:
      "TempShield double-wall vacuum insulation. Keeps cold 24 hours, hot 12 hours.",
    tags: ["water-bottle", "insulated", "hydro-flask", "outdoors"],
    inStock: true,
    freeShipping: false,
    deliveryDays: 4,
    sold: 210000,
    variants: [
      { label: "Pacific Blue", value: "blue", inStock: true },
      { label: "Black", value: "black", inStock: true },
      { label: "Olive", value: "olive", inStock: false },
    ],
  },

  // ── Toys ──────────────────────────────────────────────────────────────────
  {
    id: "prod-015",
    name: "LEGO Technic Lamborghini Huracán",
    brand: "LEGO",
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop",
    price: 449.99,
    originalPrice: 499.99,
    discountPercent: 10,
    review: { rating: 4.9, count: 3100 },
    badge: "limited",
    description:
      "3696 pieces. 1:8 scale replica with V10 engine, working steering, gearbox.",
    tags: ["lego", "technic", "lamborghini", "collector"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 3,
    sold: 8500,
  },
  {
    id: "prod-016",
    name: "Nintendo Switch OLED Model",
    brand: "Nintendo",
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop",
    price: 349.99,
    review: { rating: 4.8, count: 47200 },
    badge: "hot",
    description:
      "7-inch OLED screen, wide adjustable stand, enhanced audio, 64GB internal storage.",
    tags: ["gaming", "nintendo", "portable", "console"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 1,
    sold: 140000,
    variants: [
      { label: "White", value: "white", inStock: true },
      { label: "Neon Blue/Red", value: "neon", inStock: true },
    ],
  },

  // ── Books ─────────────────────────────────────────────────────────────────
  {
    id: "prod-017",
    name: "Atomic Habits by James Clear",
    brand: "Avery",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    price: 13.99,
    originalPrice: 27.0,
    discountPercent: 48,
    review: { rating: 4.8, count: 341000 },
    badge: "best-seller",
    description:
      "Tiny changes, remarkable results. An easy & proven way to build good habits.",
    tags: ["self-help", "habits", "productivity", "bestseller"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 2100000,
  },
  {
    id: "prod-018",
    name: "The Pragmatic Programmer, 20th Anniversary",
    brand: "Addison-Wesley",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    price: 39.99,
    review: { rating: 4.7, count: 8900 },
    description:
      "Journey to mastery. Fully revised and updated across every topic, spanning the breadth of modern software development.",
    tags: ["programming", "software", "career", "development"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 89000,
  },

  // ── Automotive ────────────────────────────────────────────────────────────
  {
    id: "prod-019",
    name: "NOCO Boost Plus GB40 Jump Starter",
    brand: "NOCO",
    category: "automotive",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop",
    price: 99.95,
    originalPrice: 129.95,
    discountPercent: 23,
    review: { rating: 4.7, count: 28400 },
    badge: "best-seller",
    description:
      "1000A portable lithium jump starter for up to 6L gasoline & 3L diesel engines.",
    tags: ["car", "jump-starter", "battery", "emergency"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 2,
    sold: 95000,
  },
  {
    id: "prod-020",
    name: "Anker Roav Smart Car Adapter",
    brand: "Anker",
    category: "automotive",
    image:
      "https://images.unsplash.com/photo-1609429019995-8c40f49535a5?q=80&w=800&auto=format&fit=crop",
    price: 29.99,
    originalPrice: 39.99,
    discountPercent: 25,
    review: { rating: 4.3, count: 11600 },
    badge: "new",
    description:
      "Works with Alexa, dual-port USB car charger, real-time OBD diagnostics via app.",
    tags: ["car", "alexa", "charging", "smart"],
    inStock: true,
    freeShipping: true,
    deliveryDays: 3,
    sold: 42000,
  },
];

export const getFeaturedProducts = () =>
  mockProducts.filter((p) => p.badge === "best-seller" || p.badge === "hot");

export const getProductsByCategory = (category: string) =>
  mockProducts.filter((p) => p.category === category);

export const getProductById = (id: string) =>
  mockProducts.find((p) => p.id === id);