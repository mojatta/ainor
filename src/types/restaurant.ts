export interface OpeningHours {
  dayOfWeek: string; // e.g. "Monday"
  open: string; // "HH:MM" 24h
  close: string; // "HH:MM" 24h
  isClosed?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  name: string;
  email?: string;
  phone?: string;
  partySize: number;
  datetimeIso: string;
  notes?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  phone?: string;
  website?: string;
  openingHours: OpeningHours[];
  menu: MenuItem[];
  reservations: Reservation[];
}



