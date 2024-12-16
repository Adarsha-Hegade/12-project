import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowUpDown, Trash2, Edit2 } from 'lucide-react';
import { useProductStore } from '../../../store/productStore';
import { useProducts } from '../../../hooks/useProducts';
import type { Product } from '../../../types';

export function ProductTable() {
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();
  const { setSorting, removeProduct } = useProductStore();

  const handleSort = (field: keyof Product) => {
    setSorting(field);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await removeProduct(id);
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort('name')}
                className="group flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                <span>Product</span>
                <ArrowUpDown className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort('code')}
                className="group flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                <span>Code</span>
                <ArrowUpDown className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort('stock')}
                className="group flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                <span>Stock</span>
                <ArrowUpDown className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Available
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {products.map((product) => (
            <tr 
              key={product._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <Package className="w-10 h-10 text-gray-400" />
                  )}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name || 'Unnamed Product'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product.manufacturer}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{product.code}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{product.size}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{product.stock}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Bad: {product.badStock} | Booked: {product.bookings}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {product.stock - product.badStock - product.bookings}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => navigate(`/products/${product._id}/edit`)}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}