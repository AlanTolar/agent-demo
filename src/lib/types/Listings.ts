export interface Address {
  street?: string;
  city: string;
  state: string;
  postCode?: string;
  county?: string;
}

export interface FeatureCategories {
  featureCategory: string;
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
  featureCategories?: FeatureCategories[];
  landDetails?: string;
  distances: Distances[];
  utilities?: Utilities[];
  housing?: string;
  improvements?: string;
}

export interface Listings {
  title: string;
  date: string;
  address: Address;
  acres: number;
  price: number;
  featuredImage: string;
  slideshowImages?: string[];
  description?: string;
  details?: string;
  summary?: Summary;
  brouchure?: string;
  location?: any;
}