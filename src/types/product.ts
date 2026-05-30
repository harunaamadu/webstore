export type ProductBadge =
  | "best-seller"
  | "new"
  | "sale"
  | "limited"
  | "prime"
  | "hot";

export type ProductCategory =
  | "electronics"
  | "fashion"
  | "home"
  | "beauty"
  | "sports"
  | "toys"
  | "books"
  | "automotive";

export interface ProductReview {
  rating: number; // 1–5
  count: number;
}

export interface ProductVariant {
  label: string;
  value: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  review: ProductReview;
  badge?: ProductBadge;
  description: string;
  tags: string[];
  variants?: ProductVariant[];
  inStock: boolean;
  freeShipping?: boolean;
  deliveryDays?: number;
  sold?: number; // units sold — for popularity indicator
  isWishlisted?: boolean;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export interface ProductGridFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  badge?: ProductBadge;
  freeShipping?: boolean;
  inStock?: boolean;
  sort?: SortOption;
}