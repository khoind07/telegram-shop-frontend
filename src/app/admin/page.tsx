'use client';

import { useInitData } from '@telegram-apps/sdk-react';
import { Package, ClipboardList, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const initData = useInitData();
  const user = initData?.user;

  // Note: Actual admin check should be done via API or a more robust state
  // For now, we'll let the API return 403 if the user is not an admin.

  return (
    <div className="flex-1 p-4 flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
          A
        </div>
        <div>
          <h1 className="font-bold text-lg">Quản trị hệ thống 🛠️</h1>
          <p className="text-sm opacity-70">Chào Admin {user?.firstName}</p>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <Link 
          href="/admin/products" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <Package size={20} />
            </div>
            <span className="font-medium">Quản lý sản phẩm</span>
          </div>
          <ChevronRight size={20} className="opacity-30" />
        </Link>

        <Link 
          href="/admin/orders" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
              <ClipboardList size={20} />
            </div>
            <span className="font-medium">Quản lý đơn hàng</span>
          </div>
          <ChevronRight size={20} className="opacity-30" />
        </Link>

        <Link 
          href="/" 
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600">
              <Settings size={20} />
            </div>
            <span className="font-medium">Quay lại cửa hàng</span>
          </div>
          <ChevronRight size={20} className="opacity-30" />
        </Link>
      </section>
    </div>
  );
}
