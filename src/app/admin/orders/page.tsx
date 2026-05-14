'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRawInitData } from '@telegram-apps/sdk-react';

type Order = {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
  items: any[];
};

export default function AdminOrdersPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const rawInitData = useRawInitData();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/all`, {
        headers: {
          'Authorization': rawInitData || ''
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': rawInitData || ''
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      alert('Lỗi cập nhật trạng thái');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-[10px] font-bold">CHỜ DUYỆT</span>;
      case 'PAID': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold">ĐÃ THANH TOÁN</span>;
      case 'COMPLETED': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold">HOÀN THÀNH</span>;
      case 'CANCELLED': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-[10px] font-bold">ĐÃ HỦY</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md z-20">
        <Link href="/admin" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-bold text-lg">Quản lý đơn hàng</h1>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {loading ? (
          <p className="text-center opacity-50 py-10">Đang tải...</p>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] opacity-50">#{order.id} • {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                  <p className="font-bold text-sm">{order.user.firstName} {order.user.lastName}</p>
                  <p className="text-xs opacity-60">@{order.user.username}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="border-t border-slate-100 dark:border-slate-700 pt-2">
                <p className="text-xs font-bold text-blue-600 mb-2">
                  Tổng cộng: {order.totalAmount.toLocaleString('vi-VN')}₫
                </p>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(order.id, 'PAID')} className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <CheckCircle size={14} /> Duyệt
                  </button>
                  <button onClick={() => updateStatus(order.id, 'COMPLETED')} className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <CheckCircle size={14} /> Xong
                  </button>
                  <button onClick={() => updateStatus(order.id, 'CANCELLED')} className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <XCircle size={14} /> Hủy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center opacity-50 py-10">Chưa có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
}
