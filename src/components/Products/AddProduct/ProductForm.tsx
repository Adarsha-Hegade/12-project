import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../../common/FormField';
import { ImageUpload } from './ImageUpload';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  code: z.string().min(1, 'Product code is required'),
  category: z.string().min(1, 'Category is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  size: z.string().min(1, 'Size is required'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  minStock: z.number().min(0, 'Minimum stock cannot be negative'),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      stock: 0,
      minStock: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      console.log('Form data:', data);
      // Handle form submission
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FormField
            label="Product Name"
            error={errors.name?.message}
            required
          >
            <input
              type="text"
              {...register('name')}
              className="form-input"
              placeholder="Enter product name"
            />
          </FormField>

          <FormField
            label="Product Code"
            error={errors.code?.message}
            required
          >
            <input
              type="text"
              {...register('code')}
              className="form-input"
              placeholder="Enter product code"
            />
          </FormField>

          <FormField
            label="Category"
            error={errors.category?.message}
            required
          >
            <select {...register('category')} className="form-select">
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </FormField>

          <FormField
            label="Manufacturer"
            error={errors.manufacturer?.message}
            required
          >
            <input
              type="text"
              {...register('manufacturer')}
              className="form-input"
              placeholder="Enter manufacturer"
            />
          </FormField>
        </div>

        <div className="space-y-6">
          <FormField
            label="Size"
            error={errors.size?.message}
            required
          >
            <input
              type="text"
              {...register('size')}
              className="form-input"
              placeholder="Enter size"
            />
          </FormField>

          <FormField
            label="Initial Stock"
            error={errors.stock?.message}
            required
          >
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className="form-input"
              min="0"
            />
          </FormField>

          <FormField
            label="Minimum Stock Level"
            error={errors.minStock?.message}
            required
          >
            <input
              type="number"
              {...register('minStock', { valueAsNumber: true })}
              className="form-input"
              min="0"
            />
          </FormField>

          <FormField
            label="Description"
            error={errors.description?.message}
          >
            <textarea
              {...register('description')}
              className="form-textarea"
              rows={3}
              placeholder="Enter product description"
            />
          </FormField>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}