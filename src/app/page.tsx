'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { ShoppingBag, History, User, ShoppingCart, Settings } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';

export default function Home() {
  const lp = useLaunchParams();
  const initData = lp?.initData as any;
  const { totalItems } = useCart();

  const user = initData?.user;

  return (
    <main className="flex-1 p-4 flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          {user?.firstName?.charAt(0) || 'U'}
        </div>
        <div>
          <h1 className="font-bold text-lg">Chào, {user?.firstName || 'bạn'}! 👋</h1>
          <p className="text-sm opacity-70">Chào mừng bạn đến với Shop Reseller</p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <Link 
          href="/products" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-slate-200 dark:border-slate-700"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <ShoppingBag size={24} />
          </div>
          <span className="font-medium">Sản phẩm</span>
        </Link>
        <Link 
          href="/cart" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-slate-200 dark:border-slate-700 relative"
        >
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
            <ShoppingCart size={24} />
          </div>
          <span className="font-medium">Giỏ hàng</span>
          {totalItems > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
              {totalItems}
            </span>
          )}
        </Link>
        <Link 
          href="/orders" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-slate-200 dark:border-slate-700"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <History size={24} />
          </div>
          <span className="font-medium">Đơn hàng</span>
        </Link>
        <Link 
          href="/admin" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-slate-200 dark:border-slate-700"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600">
            <Settings size={24} />
          </div>
          <span className="font-medium">Quản trị</span>
        </Link>
      </section>

      <section className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Ưu đãi hôm nay! 🎁</h2>
          <p className="text-blue-100 text-sm mb-4">Giảm giá 10% cho đơn hàng đầu tiên của bạn qua Mini App.</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
            Xem ngay
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      </section>

      <div className="mt-auto text-center py-4 opacity-40 text-xs">
        Phát triển bởi @canhioscrack
      </div>
    </main>
  );
}
