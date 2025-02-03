export interface Location {
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Format: YYYY-MM-DD
  location: Location;
  imageUrl: string;
  category: string;
  tags: string[];
}
