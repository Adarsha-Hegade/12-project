export interface Product {
  _id: string;
  imageUrl?: string;
  name?: string;
  code: string;
  size: string;
  manufacturer: string;
  stock: number;
  badStock: number;
  bookings: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface ApiError {
  message: string;
  status?: number;
}