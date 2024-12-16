import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ProductTable } from './ProductTable';
import { useProducts } from '../../../hooks/useProducts';

export function ProductList() {
  const { error } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Products
        </h1>
        <Link
          to="/products/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <ProductTable />
    </div>
  );
}