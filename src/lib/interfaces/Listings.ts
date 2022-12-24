export interface address {
  street: string;
  city: string;
  state: string;
  post_code: string;
  county: string;
}

export interface summary {
  feature_categories: list;
  land_details: string;
  distances: list;
  utilities: list;
  housing: string;
  improvements: string;
}

export interface listings {
  title: string;
  date: datetime;
  address: address;
  acres: number;
  price: number;
  featured_image: image;
  slideshow_images: list;
  description: richtext;
  details: richtext;
  summary: summary;
  brouchure: file;
  location: map;
}

export interface team {
  name: string;
  position: string;
  photo: image;
}