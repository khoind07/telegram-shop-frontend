'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/store/CartContext';
import ProductCard from '@/components/ProductCard';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalItems } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        // Mock data for demo if API fails
        setProducts([
          { id: 1, name: 'Sản phẩm 1', description: 'Mô tả ngắn cho sản phẩm 1', price: 100000, image: '', category: 'Cat1', stock: 10 },
          { id: 2, name: 'Sản phẩm 2', description: 'Mô tả ngắn cho sản phẩm 2', price: 250000, image: '', category: 'Cat2', stock: 5 },
          { id: 3, name: 'Sản phẩm 3', description: 'Mô tả ngắn cho sản phẩm 3', price: 500000, image: '', category: 'Cat1', stock: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md z-20">
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-bold text-lg">Sản phẩm</h1>
        <Link href="/cart" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
              {totalItems}
            </span>
          )}
        </Link>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4">
        {loading ? (
          <p className="col-span-2 text-center opacity-50 py-10">Đang tải sản phẩm...</p>
        ) : products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-2 text-center opacity-50 py-10">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
}
