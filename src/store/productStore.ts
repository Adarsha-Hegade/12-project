import { create } from 'zustand';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../lib/api/products';
import type { Product } from '../types';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortField: keyof Product | null;
  sortDirection: 'asc' | 'desc';
  fetchProducts: () => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSorting: (field: keyof Product) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  sortField: 'createdAt',
  sortDirection: 'desc',

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await getProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', isLoading: false });
    }
  },

  addProduct: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct = await createProduct(formData);
      set(state => ({
        products: [newProduct, ...state.products],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add product', isLoading: false });
      throw error;
    }
  },

  updateProduct: async (id: string, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProduct = await updateProduct(id, formData);
      set(state => ({
        products: state.products.map(p => 
          p._id === id ? updatedProduct : p
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update product', isLoading: false });
      throw error;
    }
  },

  removeProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteProduct(id);
      set(state => ({
        products: state.products.filter(p => p._id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete product', isLoading: false });
      throw error;
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSorting: (field: keyof Product) => set(state => ({
    sortField: field,
    sortDirection: state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc'
  })),
}));