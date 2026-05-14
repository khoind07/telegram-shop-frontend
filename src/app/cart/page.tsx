'use client';

import { useCart } from '@/store/CartContext';
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useInitData } from '@telegram-apps/sdk-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const initData = useInitData();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      // Chuẩn bị dữ liệu cho API
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: totalPrice
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      // Gửi API với initData trong header Authorization
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.Telegram?.WebApp?.initData || ''
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        alert('Đặt hàng thành công! 🎉');
        clearCart();
        // Redirect hoặc thông báo
      } else {
        const err = await res.json();
        alert('Lỗi: ' + (err.error || 'Không thể đặt hàng'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Đã xảy ra lỗi kết nối');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md z-20">
        <Link href="/products" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-bold text-lg">Giỏ hàng</h1>
      </header>

      <div className="flex-1 p-4 flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50 gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <Trash2 size={40} />
            </div>
            <p>Giỏ hàng của bạn đang trống</p>
            <Link href="/products" className="text-blue-600 font-bold underline">Đi mua sắm ngay</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <div key={item.product.id} className="bg-white dark:bg-slate-800 p-3 rounded-2xl flex gap-3 border border-slate-200 dark:border-slate-700">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    {item.product.image && <img src={item.product.image} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-sm line-clamp-1">{item.product.name}</h3>
                      <p className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                        {item.product.price.toLocaleString('vi-VN')}₫
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center">
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold min-w-[1rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="opacity-60">Tổng cộng:</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {totalPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform disabled:opacity-50"
              >
                {isCheckingOut ? 'Đang xử lý...' : 'Thanh toán'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
