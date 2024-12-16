import { config } from '../config';

export async function getProducts() {
  const response = await fetch(`${config.apiUrl}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(`${config.apiUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function createProduct(formData: FormData) {
  const response = await fetch(`${config.apiUrl}/products`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
}

export async function updateProduct(id: string, formData: FormData) {
  const response = await fetch(`${config.apiUrl}/products/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${config.apiUrl}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return response.json();
}