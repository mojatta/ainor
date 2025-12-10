export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  timezone: string;
}

export interface OpeningHours {
  restaurantId: string;
  dayOfWeek: number; // 0-6 (Sunday = 0, Monday = 1, ..., Saturday = 6)
  openTime: string; // "HH:MM" format
  closeTime: string; // "HH:MM" format
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  dateTime: string; // ISO format
  partySize: number;
  specialRequest?: string;
  status: "pending" | "confirmed" | "cancelled";
}
