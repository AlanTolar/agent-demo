export interface Reviews {
  customer: string;
  title: string;
  review: string;
}

export interface Agents {
  name: string;
  position: string;
  email: string;
  phone: number;
  location: string;
  image: string;
  bio: string;
  reviews: Reviews[];
}