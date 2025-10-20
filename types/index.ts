export interface Table {
  id: string;
  number: number;
  capacity: number;
  isAvailable: boolean;
  reservedBy?: string;
  reservationTime?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'drink';
  image?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  paymentMethod?: 'swipe' | 'cash' | 'paypal';
  customerName: string;
  customerEmail?: string;
  isPickup: boolean;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reservation {
  id: string;
  tableId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
}