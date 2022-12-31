export interface Reviews {
  customer: string;
  title: string;
  review: string;
}

export interface Agent {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  image: string;
  bio: string;
  reviews: Reviews[];
}