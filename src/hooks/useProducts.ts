import { useMemo } from 'react';
import { useProductStore } from '../store/productStore';
import type { Product } from '../types';

export function useProducts() {
  const {
    products,
    isLoading,
    error,
    searchQuery,
    sortField,
    sortDirection,
  } = useProductStore();

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name?.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query) ||
        product.manufacturer.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
    }

    return result;
  }, [products, searchQuery, sortField, sortDirection]);

  return {
    products: filteredAndSortedProducts,
    isLoading,
    error,
  };
}