import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProductList } from './components/Products/ProductList';
import { AddProduct } from './components/Products/AddProduct';
import { ProductDetails } from './components/Products/ProductDetails';
import { LoginForm } from './components/auth/LoginForm';
import { useAuthStore } from './store/authStore';
import { useProductStore } from './store/productStore';

export default function App() {
  const { isAuthenticated } = useAuthStore();
  const fetchProducts = useProductStore(state => state.fetchProducts);

  useEffect(() => {
    if (!isAuthenticated) {
      fetchProducts();
    }
  }, [!isAuthenticated, fetchProducts]);

  // if (!isAuthenticated) {
  //   return <LoginForm />;
  // }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}