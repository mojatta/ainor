import { Restaurant, OpeningHours, MenuItem, Reservation } from "./types";

// Mock 

const restaurant: Restaurant = {
  id: "demo-restaurant-1",
  name: "Bella Vista Trattoria",
  address: "123 Main Street, San Francisco, CA 94102",
  phone: "+1 (415) 555-0123",
  description: "Authentic Italian cuisine in the heart of the city. We serve traditional dishes made with fresh, locally-sourced ingredients.",
  timezone: "America/Los_Angeles"
};

// Opening hours (Monday-Sunday, 0-6)
const openingHours: OpeningHours[] = [
  { restaurantId: "demo-restaurant-1", dayOfWeek: 0, openTime: "11:00", closeTime: "21:00" }, // Sunday
  { restaurantId: "demo-restaurant-1", dayOfWeek: 1, openTime: "11:00", closeTime: "21:00" }, // Monday
  { restaurantId: "demo-restaurant-1", dayOfWeek: 2, openTime: "11:00", closeTime: "21:00" }, // Tuesday
  { restaurantId: "demo-restaurant-1", dayOfWeek: 3, openTime: "11:00", closeTime: "21:00" }, // Wednesday
  { restaurantId: "demo-restaurant-1", dayOfWeek: 4, openTime: "11:00", closeTime: "22:00" }, // Thursday
  { restaurantId: "demo-restaurant-1", dayOfWeek: 5, openTime: "11:00", closeTime: "22:00" }, // Friday
  { restaurantId: "demo-restaurant-1", dayOfWeek: 6, openTime: "11:00", closeTime: "22:00" }  // Saturday
];

// Menu items
const menu: MenuItem[] = [
  {
    id: "menu-1",
    restaurantId: "demo-restaurant-1",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
    price: 18.99,
    category: "Pizza",
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    id: "menu-2",
    restaurantId: "demo-restaurant-1",
    name: "Spaghetti Carbonara",
    description: "Traditional Roman pasta with eggs, pancetta, parmesan, and black pepper",
    price: 22.99,
    category: "Pasta",
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    id: "menu-3",
    restaurantId: "demo-restaurant-1",
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, basil, and balsamic glaze",
    price: 14.99,
    category: "Salads",
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: true,
    isAvailable: true
  },
  {
    id: "menu-4",
    restaurantId: "demo-restaurant-1",
    name: "Eggplant Parmesan",
    description: "Breaded eggplant layered with marinara sauce and mozzarella",
    price: 19.99,
    category: "Main Courses",
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    id: "menu-5",
    restaurantId: "demo-restaurant-1",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon butter and seasonal vegetables",
    price: 28.99,
    category: "Main Courses",
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: true,
    isAvailable: true
  },
  {
    id: "menu-6",
    restaurantId: "demo-restaurant-1",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
    price: 9.99,
    category: "Desserts",
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isAvailable: true
  }
];

// Sample reservations
const reservations: Reservation[] = [
  {
    id: "res-1",
    restaurantId: "demo-restaurant-1",
    customerName: "John Smith",
    customerPhone: "+1 (415) 555-0100",
    customerEmail: "john.smith@example.com",
    dateTime: "2024-12-20T19:00:00-08:00",
    partySize: 2,
    specialRequest: "Window seat if possible",
    status: "confirmed"
  },
  {
    id: "res-2",
    restaurantId: "demo-restaurant-1",
    customerName: "Maria Garcia",
    customerPhone: "+1 (415) 555-0101",
    customerEmail: "maria.garcia@example.com",
    dateTime: "2024-12-21T18:30:00-08:00",
    partySize: 4,
    status: "pending"
  },
  {
    id: "res-3",
    restaurantId: "demo-restaurant-1",
    customerName: "David Chen",
    customerPhone: "+1 (415) 555-0102",
    dateTime: "2024-12-19T20:00:00-08:00",
    partySize: 2,
    specialRequest: "Anniversary celebration",
    status: "confirmed"
  }
];

export function getRestaurantContext(restaurantId: string) {
  if (restaurantId !== "demo-restaurant-1") {
    throw new Error(`Restaurant with id "${restaurantId}" not found`);
  }

  return {
    restaurant,
    openingHours,
    menu
  };
}
