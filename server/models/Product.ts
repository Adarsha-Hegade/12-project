import mongoose from 'mongoose';

export interface IProduct {
  imageUrl: string;
  name: string;
  code: string;
  category: string;
  size: string;
  manufacturer: string;
  stock: number;
  minStock: number;
  badStock: number;
  bookings: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  minStock: {
    type: Number,
    default: 0,
  },
  badStock: {
    type: Number,
    default: 0,
  },
  bookings: {
    type: Number,
    default: 0,
  },
  description: String,
}, {
  timestamps: true,
});

export const Product = mongoose.model<IProduct>('Product', productSchema);