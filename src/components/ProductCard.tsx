'use client';

import { Product, useCart } from '@/store/CartContext';
import { Plus } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="aspect-square bg-slate-100 dark:bg-slate-700 relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
        <p className="text-xs opacity-60 line-clamp-2 mt-1 flex-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
