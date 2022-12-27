export interface Address {
  street?: string;
  city: string;
  state: string;
  post_code?: string;
  county?: string;
}

export interface FeatureCategories {
  feature_category: string;
  features: string;
}

export interface Distances {
  location: string;
  distance: number;
}

export interface Utilities {
  utility: string;
  availability: string;
}

export interface Summary {
  feature_categories?: FeatureCategories[];
  land_details?: string;
  distances: Distances[];
  utilities?: Utilities[];
  housing?: string;
  improvements?: string;
}

export interface Listings {
  title: string;
  date: Date;
  address: Address;
  acres: number;
  price: number;
  featured_image: string;
  slideshow_images?: string[];
  description?: string;
  details?: string;
  summary?: Summary;
  brouchure?: string;
  location?: string;
}